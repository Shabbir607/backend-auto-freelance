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
        $context = [];

        // Simple route matching for SSR data orchestration
        $isNotFound = false;
        if ($url === '/' || $url === '') {
            $context = $this->getHomepageData();
        } elseif ($url === '/blogs') {
            $context = $this->getBlogsListData();
        } elseif ($url === '/workflows') {
            $context = $this->getWorkflowsListData();
        } elseif (preg_match('/^\/blogs\/([^\/]+)\/?$/', $url, $matches)) {
            $context = $this->getBlogData($matches[1]);
            if (empty($context)) $isNotFound = true;
        } elseif (preg_match('/^\/workflow\/([^\/]+)\/?$/', $url, $matches)) {
            $context = $this->getWorkflowData($matches[1]);
            if (empty($context)) $isNotFound = true;
        }
        // Render the page on the server
        $ssrResponse = SsrService::render($url, $context);
        $ssrHtml = '';
        $ssrHead = '';

        if ($ssrResponse) {
            $data = json_decode($ssrResponse, true);
            if (isset($data['html'])) {
                $ssrHtml = $data['html'];
                $ssrHead = $data['head'] ?? '';
            } else {
                // Fallback for non-JSON responses
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
            'seo' => null, // Placeholder or remove if not using a separate SEO relation
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
}
