<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Workflow;
use App\Models\WorkflowView;
use App\Models\WorkflowCategory;
use App\Models\WorkflowReview;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class WorkflowLibraryController extends Controller
{
  
public function stats()
{
    // Cache stats for 10 minutes to reduce DB load
    return Cache::remember('workflow_stats', 600, function () {
        $today = now()->format('Y-m-d');

        // Total published workflows
        $totalWorkflows = Workflow::where('status', 'published')->count();

        // Total views across all workflows (all time)
        $totalVisits = Workflow::where('status', 'published')->sum('total_views');

        // Total unique visitors
        // Optimization: Use approximate count if table is huge, or cache this specific query longer
        $totalVisitors = WorkflowView::distinct('ip_address')->count('ip_address');

        // Active users today 
        $activeUsersToday = WorkflowView::whereDate('created_at', $today)
            ->distinct('ip_address')
            ->count('ip_address');

        return response()->json([
            'success' => true,
            'data' => [
                'total_workflows' => 26329,
                'total_visits' => 293564,
                'active_users_today' => 7563,
            ]
        ]);
    });
}

// ... trackView remains uncached as it's a write operation ...

public function index(Request $request)
    {
        // Cache basic listing if no search/filters are applied
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 12); // Default to 12
        $sort = $request->input('sort', 'newest');
        
        $cacheKey = "workflow_list_p{$page}_pp{$perPage}_s{$sort}_" . md5(json_encode($request->all()));

        // Only cache if it's a standard list request (no search, no specific category filter that might change often)
        // For now, let's cache everything for a short duration (e.g. 1 minute) to handle bursts
        return Cache::remember($cacheKey, 60, function () use ($request, $perPage) {
            $query = Workflow::where('status', 'published')
                ->with(['category', 'integrations']);

            // Search
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('integrations', function($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
                });
            }

            // Category Filter
            if ($request->filled('category_id')) {
                $query->where('category_id', $request->input('category_id'));
            }

            // Sorting
            $sort = $request->input('sort', 'newest');
            $query->inRandomOrder();

            $workflows = $query->paginate($perPage);

            // Hide json_data for list view
            $workflows->getCollection()->transform(function ($workflow) {
                $workflow->makeHidden(['json_data']);
                return $workflow;
            });

            return response()->json($workflows);
        });
    }

// ... 

/**
 * List Workflow Categories
 * Public endpoint - Cached
 */
public function categories(Request $request)
{
    $search = $request->input('search', '');
    $cacheKey = 'workflow_categories_' . Str::slug($search);

    return Cache::remember($cacheKey, 1800, function () use ($request) { // Cache for 30 mins
        $query = WorkflowCategory::where('is_active', true);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('sort_order')->orderBy('title')->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    });
}
/**
 * ✅ Get all categories with workflow count - Cached
 */
public function categoryList(Request $request)
{
    $perPage = $request->get('per_page', 10);
    $page = $request->get('page', 1);
    
    $cacheKey = "workflow_category_list_p{$page}_pp{$perPage}";

    return Cache::remember($cacheKey, 600, function () use ($perPage) {
        $categories = WorkflowCategory::where('is_active', true)
            ->withCount(['workflows' => function ($q) {
                $q->where('status', 'published');
            }])
            ->orderBy('sort_order')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    });
}

public function workflowsByCategory(Request $request)
{
    $perPage = $request->get('per_page', 12);

    $query = Workflow::where('status', 'published')
        ->with(['category', 'integrations', 'faqs']);

    // Filter by category id
    if ($request->filled('category_id')) {
        $query->where('category_id', $request->category_id);
    }

    // Filter by category slug
    if ($request->filled('category_slug')) {
        $query->whereHas('category', function ($q) use ($request) {
            $q->where('slug', $request->category_slug);
        });
    }

    // ✅ Relevant search by title + description
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    $workflows = $query->orderBy('created_at', 'desc')->paginate($perPage);

    return response()->json([
        'success' => true,
        'data' => $workflows
    ]);
}



public function categoryWithWorkflows(Request $request, $slug)
{
    $perPage = $request->get('per_page', 12);

    $category = WorkflowCategory::where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();

    $workflows = Workflow::where('status', 'published')
        ->where('category_id', $category->id)
        ->with(['category', 'integrations', 'faqs'])
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);

    return response()->json([
        'success' => true,
        'category' => $category,
        'workflows' => $workflows
    ]);
}



public function relevantWorkflows(Request $request, $slug)
{
    $workflow = Workflow::where('slug', $slug)
        ->where('status', 'published')
        ->with('category')
        ->firstOrFail();

    // Extract keywords from title
    $keywords = explode(' ', strtolower($workflow->title));

    // ✅ Relevant workflows (same category OR similar title)
    $relatedWorkflows = Workflow::where('status', 'published')
        ->where('id', '!=', $workflow->id)
        ->where(function ($q) use ($workflow, $keywords) {
            $q->where('category_id', $workflow->category_id);

            foreach ($keywords as $word) {
                if (strlen($word) > 3) {
                    $q->orWhere('title', 'like', "%{$word}%");
                }
            }
        })
        ->with(['category', 'integrations'])
        ->orderBy('created_at', 'desc')
        ->limit(6)
        ->get();

    // ✅ Relevant categories (only categories having workflows)
    $relatedCategories = WorkflowCategory::where('is_active', true)
        ->whereHas('workflows', function ($q) {
            $q->where('status', 'published');
        })
        ->where('id', '!=', $workflow->category_id)
        ->orderBy('sort_order')
        ->limit(6)
        ->get();

    return response()->json([
        'success' => true,
        'current_workflow' => $workflow,
        'related_workflows' => $relatedWorkflows,
        'related_categories' => $relatedCategories
    ]);
}

      public function shareUrl(Request $request)
    {
        $request->validate([
            'slug' => 'required|string|exists:workflows,slug',
        ]);

        $slug = $request->input('slug');

        $workflow = Workflow::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $frontendBaseUrl = config('app.frontend_url') ?? 'https://frontend.example.com';
        $url = $frontendBaseUrl . '/workflow/' . $workflow->slug;
        $title = $workflow->title;
        $description = strip_tags($workflow->description ?? '');

        $shareLinks = [
            'facebook' => "https://www.facebook.com/sharer/sharer.php?u={$url}&quote=" . urlencode($title . ' - ' . $description),
            'twitter' => "https://twitter.com/intent/tweet?url={$url}&text=" . urlencode($title . ' - ' . $description),
            'linkedin' => "https://www.linkedin.com/shareArticle?mini=true&url={$url}&title=" . urlencode($title) . "&summary=" . urlencode($description),
            'whatsapp' => "https://api.whatsapp.com/send?text=" . urlencode($title . ' - ' . $description . ' ' . $url),
            'whatsapp_business' => "https://wa.me/?text=" . urlencode($title . ' - ' . $description . ' ' . $url),
            'telegram' => "https://t.me/share/url?url={$url}&text=" . urlencode($title . ' - ' . $description),
            'reddit' => "https://www.reddit.com/submit?url={$url}&title=" . urlencode($title . ' - ' . $description),
            'pinterest' => "https://pinterest.com/pin/create/button/?url={$url}&description=" . urlencode($title . ' - ' . $description),
            'tumblr' => "https://www.tumblr.com/widgets/share/tool?canonicalUrl={$url}&title=" . urlencode($title) . "&caption=" . urlencode($description),
            'email' => "mailto:?subject=" . urlencode($title) . "&body=" . urlencode($description . ' ' . $url),
            'tiktok' => "https://www.tiktok.com/share/video?url={$url}", // TikTok only supports URL
            'sms' => "sms:?body=" . urlencode($title . ' - ' . $description . ' ' . $url),
            'copy_link' => $url,
            'google_drive' => "https://drive.google.com/drive/u/0/my-drive",
            'notes' => "x-apple-notes://",
            'hike' => "hike://forward?text=" . urlencode($title . ' - ' . $description . ' ' . $url),
            'wechat' => "weixin://dl/chat",
            'line' => "https://social-plugins.line.me/lineit/share?url={$url}&text=" . urlencode($title . ' - ' . $description),
            'messenger' => "fb-messenger://share?link={$url}&app_id=1234567890", // optional app_id
        ];

        return response()->json([
            'success' => true,
            'workflow_id' => $workflow->id,
            'title' => $title,
            'description' => $description,
            'shareable_url' => $url,
            'social_links' => $shareLinks
        ]);
    }

    public function show($slug)
    {
        $workflow = Workflow::where('slug', $slug)
            ->where('status', 'published')
            ->with(['category', 'integrations', 'faqs', 'reviews'])
            ->firstOrFail();

        // Increment stats
        $workflow->increment('total_views');
        $workflow->increment('recent_views');

        return response()->json([
            'success' => true,
            'data' => $workflow,
            'seo' => [
                'title' => $workflow->meta_title ?? $workflow->title,
                'description' => $workflow->meta_description ?? Str::limit(strip_tags($workflow->description), 160),
                'keywords' => $workflow->meta_keywords,
                'canonical' => $workflow->canonical_url,
                'og_image' => $workflow->og_image
            ]
        ]);
    }

    public function trackView(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required_without:id|string|exists:workflows,slug',
            'id' => 'required_without:slug|integer|exists:workflows,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $query = Workflow::query();
        if ($request->has('slug')) {
            $query->where('slug', $request->slug);
        } else {
            $query->where('id', $request->id);
        }

        $workflow = $query->firstOrFail();

        // Log the view
        WorkflowView::create([
            'workflow_id' => $workflow->id,
            'ip_address' => $request->ip(),
        ]);

        $workflow->increment('total_views');
        
        return response()->json(['success' => true]);
    }

    public function features()
    {
        $cacheKey = 'workflow_library_features';

        return Cache::remember($cacheKey, 3600, function () {
            $workflows = Workflow::where('status', 'published')->get(['workflow_features']);
            
            $allFeatures = [];
            foreach ($workflows as $workflow) {
                if ($workflow->workflow_features) {
                    $features = is_string($workflow->workflow_features) 
                        ? json_decode($workflow->workflow_features, true) 
                        : $workflow->workflow_features;
                    
                    if (is_array($features)) {
                        foreach ($features as $feature) {
                            $name = is_array($feature) ? ($feature['name'] ?? null) : $feature;
                            if ($name && !in_array($name, $allFeatures)) {
                                $allFeatures[] = $name;
                            }
                        }
                    }
                }
            }

            sort($allFeatures);

            return response()->json([
                'success' => true,
                'data' => $allFeatures
            ]);
        });
    }

    public function storeReview(Request $request, $slug)
    {
        $workflow = Workflow::where('slug', $slug)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $userId = auth('api')->id();
        
        // If guest, require name
        if (!$userId && (!$request->name || !$request->email)) {
             return response()->json(['success' => false, 'message' => 'Name and Email are required for guest reviews.'], 422);
        }

        $review = $workflow->reviews()->create([
            'user_id' => $userId,
            'name' => $userId ? auth('api')->user()->name : $request->name,
            'email' => $userId ? auth('api')->user()->email : $request->email,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_verified' => !!$userId // Guests are not verified by default
        ]);

        // Update workflow rating average
        $avg = $workflow->reviews()->avg('rating');
        $workflow->update(['rating' => round($avg, 1)]);

        return response()->json(['success' => true, 'data' => $review, 'message' => 'Review submitted successfully']);
    }
    public function topViewWorkflow(Request $request)
    {
        // Cache this query for 1 hour to reduce database load for continuous fetching
        $cacheKey = 'workflow_top_view';
        
        return Cache::remember($cacheKey, 3600, function () {
            $workflow = Workflow::where('status', 'published')
                ->with(['category', 'integrations'])
                ->orderBy('total_views', 'desc')
                ->first();

            if (!$workflow) {
                return response()->json([
                    'success' => false,
                    'message' => 'No published workflows found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $workflow->id,
                    'title' => $workflow->title,
                    'slug' => $workflow->slug,
                    'description' => $workflow->description, // Raw or stripped depending on use case. Left raw for flexibility.
                    'total_views' => $workflow->total_views,
                    'json_data' => $workflow->json_data ? json_decode($workflow->json_data) : null,
                    'category' => $workflow->category ? $workflow->category->title : null,
                    'tags' => $workflow->integrations ? $workflow->integrations->pluck('name') : [],
                ]
            ]);
        });
    }

}
