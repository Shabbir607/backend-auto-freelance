<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use Illuminate\Http\Request;

class WorkflowLibraryController extends Controller
{
    public function index(Request $request)
    {
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
        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        // Sorting
        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'most_popular':
                $query->orderBy('user_count', 'desc');
                break;
            case 'highest_rated':
                $query->orderBy('rating', 'desc');
                break;
            case 'highest_roi':
                $query->orderBy('roi_percentage', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $workflows = $query->paginate(12);

        // Hide json_data for list view
        $workflows->getCollection()->transform(function ($workflow) {
            $workflow->makeHidden(['json_data']);
            return $workflow;
        });

        return response()->json($workflows);
    }

    public function show($slug)
    {
        $workflow = Workflow::where('slug', $slug)
            ->where('status', 'published')
            ->with(['category', 'integrations'])
            ->firstOrFail();

        // Hide json_data for public view by default
        // The user spec says "hidden but accessible via a secure API endpoint if the user is authenticated (or if the "Deploy" action is triggered)."
        // For this endpoint, we'll hide it.
        $workflow->makeHidden(['json_data']);

        return response()->json($workflow);
    }

    // Endpoint to get the secure template data (e.g. for "Deploy")
    // Needs authentication or specific permissions
    public function deploy($slug)
    {
        // Add specific auth check if needed, e.g. middleware will handle it in routes
        // if (!auth()->check()) { return response()->json(['message' => 'Unauthorized'], 401); }

        $workflow = Workflow::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return response()->json(['json_data' => $workflow->json_data]);
    }

    /**
     * List Workflow Categories
     * Public endpoint
     */
    public function categories(Request $request)
    {
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
    }

    /**
     * List Workflow Features
     * Public endpoint - aggregates features from all published workflows
     */
    public function features(Request $request)
    {
        $workflows = Workflow::where('status', 'published')
            ->select('workflow_features')
            ->get();

        $allFeatures = collect();
        
        foreach ($workflows as $wf) {
            if (!empty($wf->workflow_features) && is_array($wf->workflow_features)) {
                $allFeatures = $allFeatures->merge($wf->workflow_features);
            }
        }

        $uniqueFeatures = $allFeatures->unique()->values();

        if ($request->has('search')) {
            $search = strtolower($request->input('search'));
            $uniqueFeatures = $uniqueFeatures->filter(function ($value) use ($search) {
                return strpos(strtolower($value), $search) !== false;
            })->values();
        }

        return response()->json([
            'success' => true,
            'data' => $uniqueFeatures
        ]);
    }
}
