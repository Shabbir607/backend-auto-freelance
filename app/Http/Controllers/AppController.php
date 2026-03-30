<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SsrService;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use App\Models\Blog;

class AppController extends Controller
{
    public function __invoke(Request $request)
    {
        $url = $request->getPathInfo(); // Use path info instead of URI to exclude query strings
        $normalizedPath = ltrim($url, '/');
        if ($normalizedPath === '') $normalizedPath = 'home';
        \Log::info("SSR Normalized Path: [" . $normalizedPath . "]");
        
        $context = [];
        $seoData = $this->getSeoData($normalizedPath);
        if ($seoData) {
            $context['seo'] = $seoData;
        }

        // Simple route matching for SSR data orchestration
        $isNotFound = false;
        $routeData = [];
        if ($url === '/' || $url === '') {
            $routeData = $this->getHomepageData();
        } elseif ($url === '/blogs') {
            $routeData = $this->getBlogsListData();
        } elseif ($url === '/workflows') {
            $routeData = $this->getWorkflowsListData();
        } elseif (preg_match('/^\/blogs\/([^\/]+)\/?$/', $url, $matches)) {
            $routeData = $this->getBlogData($matches[1]);
            if (empty($routeData)) $isNotFound = true;
        } elseif (preg_match('/^\/workflow\/([^\/]+)\/?$/', $url, $matches)) {
            $routeData = $this->getWorkflowData($matches[1]);
            if (empty($routeData)) $isNotFound = true;
        }
        // Merge route data into context while preserving the seo key
        $context = array_merge($routeData, $context);
        // Render the page on the server
        $ssrResponse = SsrService::render($url, $context);
        \Log::debug('Raw SSR Response for ' . $url . ': ' . ($ssrResponse ?: 'NULL'));
        $ssrHtml = '';
        $ssrHead = '';

        if ($ssrResponse) {
            $decoded = json_decode($ssrResponse, true);
            if (json_last_error() === JSON_ERROR_NONE && isset($decoded['html'])) {
                $ssrHtml = $decoded['html'];
                $ssrHead = $decoded['head'] ?? '';
            } else {
                // Fallback for non-JSON response
                $ssrHtml = $ssrResponse;
            }
        }

        return response(view('app', [
            'ssrHtml' => $ssrHtml,
            'ssrHead' => $ssrHead,
            'ssrData' => $context
        ]), $isNotFound ? 404 : 200);
    }

    protected function getHomepageData()
    {
        return [
            'stats' => [
                'total_workflows' => Workflow::where('status', 'published')->count(),
                'total_visits' => Workflow::where('status', 'published')->sum('total_views'),
                'active_users_today' => rand(7323, 8000),
            ],
            'categories' => WorkflowCategory::where('is_active', true)
                ->withCount(['workflows' => function ($q) {
                    $q->where('status', 'published');
                }])
                ->orderBy('sort_order')
                ->get(),
            'workflows' => Workflow::where('status', 'published')
                ->with(['category', 'integrations'])
                ->inRandomOrder()
                ->limit(12)
                ->get()
                ->makeHidden(['json_data']),
            'blogs' => Blog::published()
                ->with(['category', 'author:id,name,email'])
                ->orderByDesc('is_featured')
                ->orderByDesc('published_at')
                ->limit(20)
                ->get(),
        ];
    }

    protected function getBlogData($slug)
    {
        $blog = Blog::published()
            ->with(['category', 'author:id,name,email', 'faqs'])
            ->where('slug', $slug)
            ->first();

        if (!$blog) return [];

        return [
            'blog' => $blog,
            'seo' => [
                'title' => $blog->meta_title ?? $blog->title,
                'description' => $blog->meta_description ?? substr(strip_tags($blog->content), 0, 160),
                'keywords' => $blog->meta_keywords,
                'og_image' => $blog->og_image ?? $blog->image_url,
                'canonical_url' => $blog->canonical_url,
                'meta_tags' => json_decode($blog->meta_tags ?? '[]', true),
            ],
            'relatedBlogs' => Blog::published()
                ->where('category_id', $blog->category_id)
                ->where('id', '!=', $blog->id)
                ->limit(6)
                ->get(),
            'relatedWorkflows' => Workflow::where('status', 'published')
                ->with(['category', 'integrations'])
                ->limit(4)
                ->get()
                ->makeHidden(['json_data']),
        ];
    }

    protected function getWorkflowData($slug)
    {
        $workflow = Workflow::where('slug', $slug)
            ->where('status', 'published')
            ->with(['category', 'integrations', 'reviews.user', 'faqs'])
            ->first();

        if (!$workflow) return [];

        return [
            'workflow' => $workflow,
            'seo' => [
                'title' => $workflow->meta_title ?? $workflow->title,
                'description' => $workflow->meta_description ?? substr(strip_tags($workflow->description), 0, 160),
                'keywords' => $workflow->meta_keywords,
                'og_image' => $workflow->og_image,
                'canonical_url' => $workflow->canonical_url,
            ],
            'relatedWorkflows' => Workflow::where('status', 'published')
                ->where('id', '!=', $workflow->id)
                ->where('category_id', $workflow->category_id)
                ->limit(4)
                ->get()
                ->makeHidden(['json_data']),
            'relevantBlogs' => Blog::published()
                ->where('category_id', $workflow->category_id)
                ->limit(4)
                ->get()
        ];
    }

    protected function getBlogsListData()
    {
        return [
            'blogs' => Blog::published()
                ->with(['category', 'author:id,name,email'])
                ->orderByDesc('is_featured')
                ->orderByDesc('published_at')
                ->paginate(12),
            'categories' => \App\Models\BlogCategory::where('is_active', true)->get(),
        ];
    }

    protected function getWorkflowsListData()
    {
        return [
            'workflows' => Workflow::where('status', 'published')
                ->with(['category', 'integrations'])
                ->paginate(12)
                ->makeHidden(['json_data']),
            'categories' => WorkflowCategory::where('is_active', true)->get(),
        ];
    }

    protected function getSeoData($slug)
    {
        $page = \App\Models\Page::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$page) {
            return null;
        }

        return [
            'title' => $page->meta_title ?? $page->title,
            'description' => $page->meta_description,
            'keywords' => $page->meta_keywords,
            'og_image' => $page->og_image,
            'meta_tags' => $page->meta_tags ?? [],
            'structured_data' => [
                '@context' => 'https://schema.org',
                '@type' => 'WebPage',
                'name' => $page->title,
                'description' => $page->meta_description,
                'url' => url($slug === 'home' ? '/' : $slug),
            ]
        ];
    }
}
