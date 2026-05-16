<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SsrService;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use App\Models\Blog;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use App\Traits\HandlesRelatedContent;

class AppController extends Controller
{
    use HandlesRelatedContent;

    public function __invoke(Request $request)
    {
        $url = $request->getPathInfo(); // Use path info instead of URI to exclude query strings
        $normalizedPath = ltrim($url, '/');
        if ($normalizedPath === '') $normalizedPath = 'home';
        Log::info("SSR Normalized Path: [" . $normalizedPath . "]");
        
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
        } elseif ($url === '/workflows' || $url === '/workflow-library' || $url === '/templates') {
            $routeData = $this->getWorkflowsListData();
        } elseif (preg_match('/^\/blogs\/([^\/]+)\/?$/', $url, $matches)) {
            $routeData = $this->getBlogData($matches[1]);
            if (empty($routeData)) $isNotFound = true;
        } elseif (preg_match('/^\/workflow\/([^\/]+)\/?$/', $url, $matches)) {
            $routeData = $this->getWorkflowData($matches[1]);
            if (empty($routeData)) $isNotFound = true;
        } elseif (preg_match('/^\/workflow-categories\/([^\/]+)\/?$/', $url, $matches)) {
            $routeData = $this->getWorkflowsListData(); // Page fetches by query param usually, but SSR can provide list
            // We could potentially filter here if we had getWorkflowCategoryListData($matches[1])
            if (empty($routeData)) $isNotFound = true;
        } else {
            // Check if the URL matches any other valid frontend routes
            // If not, it's a true 404 (prevents Soft 404s for junk URLs like /wp-admin, /random-path)
            $validFrontendRoutes = [
                '/^\/login\/?$/',
                '/^\/signup\/?$/',
                '/^\/contact\/?$/',
                '/^\/sitemap\/?$/',
                '/^\/courses(\/.*)?$/',
                '/^\/blog-categories\/[^\/]+\/?$/',
                '/^\/workflow\/?$/',
                '/^\/interview\/[^\/]+\/?$/',
                '/^\/app(\/.*)?$/',
                '/^\/superadmin(\/.*)?$/',
            ];

            $isValidRoute = false;
            foreach ($validFrontendRoutes as $pattern) {
                if (preg_match($pattern, $url)) {
                    $isValidRoute = true;
                    break;
                }
            }

            if (!$isValidRoute) {
                $isNotFound = true;
            }
        }
        
        // Merge route data into context while preserving the seo key
        // We merge routeData AFTER seoData so specific routes can override generic page settings
        $context = array_merge($context, $routeData);
        
        // Render the page on the server
        $ssrResponse = SsrService::render($url, $context);
        $ssrHtml = '';
        $ssrHead = '';

        if ($ssrResponse) {
            $decoded = json_decode($ssrResponse, true);
            if (json_last_error() === JSON_ERROR_NONE && isset($decoded['html'])) {
                $ssrHtml = $decoded['html'];
                $ssrHead = $decoded['head'] ?? '';
            } else {
                $ssrHtml = $ssrResponse;
            }
        }

        // Build canonical & og:image for the Blade fallback (when SSR head is empty)
        $origin = rtrim(config('app.frontend_url') ?? 'https://edgelancer.com', '/');
        $seoCtx = $context['seo'] ?? [];
        $fallbackCanonical = $origin . '/' . ltrim($request->getPathInfo(), '/');
        $fallbackCanonical = rtrim($fallbackCanonical, '/'); // clean trailing slash
        $canonical = $seoCtx['canonical'] ?? $fallbackCanonical;
        $canonical = preg_replace('/https?:\/\/localhost(:\d+)?/', $origin, $canonical);
        $ogImage   = $seoCtx['og_image']  ?? "{$origin}/og-image.png";
        $ogImage   = preg_replace('/https?:\/\/localhost(:\d+)?/', $origin, $ogImage);

        return response(view('app', [
            'ssrHtml'   => $ssrHtml,
            'ssrHead'   => $ssrHead,
            'ssrData'   => $context,
            'canonical' => $canonical,
            'ogImage'   => $ogImage,
        ]), $isNotFound ? 404 : 200);
    }

    protected function getHomepageData()
    {
        $origin = config('app.frontend_url') ?? 'https://edgelancer.com';
        $stats = Cache::remember('workflow_stats_base_ssr', 600, function () {
            return [
                'total_workflows' => Workflow::where('status', 'published')->count(),
                'total_visits' => Workflow::where('status', 'published')->sum('total_views'),
                'active_users_today' => rand(7323, 8000),
            ];
        });

        return [
            'workflows' => Workflow::where('status', 'published')->with(['category', 'integrations'])->take(6)->get(),
            'blogs' => Blog::where('status', 'published')->with('category')->take(3)->get(),
            'categories' => WorkflowCategory::where('is_active', true)->orderBy('sort_order')->take(12)->get(),
            'stats' => $stats,
            'seo' => [
                'title' => 'EdgeLancer – n8n Workflow Automation Templates & AI Agents',
                'description' => 'Download ready-to-use n8n workflow automation templates. Connect apps, automate tasks, and build powerful AI agents with EdgeLancer.',
                'og_image' => "{$origin}/og-image.png",
                'canonical' => $origin,
                'og_type' => 'website',
                'structured_data' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'WebSite',
                    'name' => 'EdgeLancer',
                    'url' => $origin,
                    'potentialAction' => [
                        '@type' => 'SearchAction',
                        'target' => "{$origin}/workflows?search={search_term_string}",
                        'query-input' => 'required name=search_term_string'
                    ]
                ]
            ]
        ];
    }

    protected function getBlogData($slug)
    {
        $blog = Blog::where('slug', $slug)
            ->where('status', 'published')
            ->with(['category', 'author'])
            ->first();

        if (!$blog) {
            return [];
        }

        $relatedBlogs = Blog::where('category_id', $blog->category_id)
            ->where('id', '!=', $blog->id)
            ->where('status', 'published')
            ->take(3)
            ->get();

        $relatedWorkflows = $this->getWorkflowsRelatedToBlog($blog, 4);



        return [
            'blog' => $blog,
            'seo' => $blog->getSeoMetadata(),
            'relatedBlogs' => $relatedBlogs,
            'relatedWorkflows' => $relatedWorkflows
        ];
    }

    protected function getWorkflowData($slug)
    {
        $workflow = Workflow::where('slug', $slug)
            ->where('status', 'published')
            ->with(['category', 'integrations'])
            ->first();

        if (!$workflow) {
            return [];
        }

        $relatedWorkflows = $this->getWorkflowsRelatedToWorkflow($workflow, 3);


        $suggestedBlogs = $this->getBlogsRelatedToWorkflow($workflow, 6);



        return [
            'workflow' => $workflow,
            'seo' => $workflow->getSeoMetadata(),
            'relatedWorkflows' => $relatedWorkflows,
            'suggestedBlogs' => $suggestedBlogs
        ];
    }

    protected function getBlogsListData()
    {
        $origin = config('app.frontend_url') ?? 'https://edgelancer.com';
        return [
            'blogs' => Blog::where('status', 'published')
                ->with(['category', 'author'])
                ->paginate(12),
            'categories' => \App\Models\BlogCategory::all(),
            'seo' => [
                'title' => 'Expert Automation & AI Blog | EdgeLancer Insights',
                'description' => 'Read detailed guides, case studies, and tutorials on n8n automation, AI agent development, and freelance business scaling.',
                'og_image' => "{$origin}/og-image.png",
                'canonical' => "{$origin}/blogs",
                'og_type' => 'website'
            ]
        ];
    }

    protected function getWorkflowsListData()
    {
        $origin = config('app.frontend_url') ?? 'https://edgelancer.com';
        return [
            'workflows' => Workflow::where('status', 'published')
                ->with(['category', 'integrations'])
                ->paginate(12)
                ->makeHidden(['json_data']),
            'categories' => WorkflowCategory::where('is_active', true)->get(),
            'seo' => [
                'title' => 'n8n Workflow Templates – Automate Your Business | EdgeLancer',
                'description' => 'Explore the largest library of professional n8n automation templates. Download and import ready-to-use workflows for AI, CRM, and more.',
                'og_image' => "{$origin}/og-image.png",
                'canonical' => "{$origin}/workflows",
                'og_type' => 'website'
            ]
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

        return $page->getSeoMetadata();
    }
}
