<?php

namespace App\Http\Controllers\Api\PublicApi;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Blog::where('status', 'published')
            ->with(['category', 'author']);

        // Filter by category if provided
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search in title or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        // Filter for featured blogs
        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        // Sorting
        $sort = $request->get('sort', 'latest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('published_at', 'asc');
                break;
            case 'popular':
                $query->orderBy('views', 'desc');
                break;
            case 'featured':
                $query->orderBy('is_featured', 'desc')->orderBy('published_at', 'desc');
                break;
            default:
                $query->orderBy('published_at', 'desc');
        }

        $blogs = $query->paginate($request->get('per_page', 12));

        return response()->json($blogs);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        try {
            $blog = Blog::where('slug', $slug)
                ->where('status', 'published')
                ->with(['category', 'author', 'faqs'])
                ->first();

            if (!$blog) {
                return response()->json(['message' => 'Blog not found'], 404);
            }

            // Increment views
            $blog->increment('views');

            // Get related blogs (by category)
            $relatedBlogs = Blog::where('category_id', $blog->category_id)
                ->where('id', '!=', $blog->id)
                ->where('status', 'published')
                ->take(3)
                ->get();

            // Get related workflows (by category)
            $relatedWorkflows = Workflow::where('category_id', $blog->category_id)
                ->where('status', 'published')
                ->take(4)
                ->get();

            return response()->json([
                'blog' => $blog,
                'seo' => $blog->getSeoMetadata(),
                'relatedBlogs' => $relatedBlogs,
                'relatedWorkflows' => $relatedWorkflows
            ], 200);

        } catch (\Exception $e) {
            \Log::error("Error fetching blog post: " . $e->getMessage());
            return response()->json(['message' => 'Server error'], 500);
        }
    }

    /**
     * Get featured blogs.
     */
    public function featured()
    {
        $blogs = Blog::where('status', 'published')
            ->where('is_featured', true)
            ->with(['category', 'author'])
            ->orderBy('published_at', 'desc')
            ->take(5)
            ->get();

        return response()->json($blogs);
    }

    /**
     * Get recent blogs.
     */
    public function recent(Request $request)
    {
        $limit = $request->get('limit', 3);
        $blogs = Blog::where('status', 'published')
            ->with(['category', 'author'])
            ->orderBy('published_at', 'desc')
            ->take($limit)
            ->get();

        return response()->json($blogs);
    }

    /**
     * Get related blogs for a blog post.
     */
    public function relatedBlogs($slug)
    {
        $blog = Blog::where('slug', $slug)->where('status', 'published')->firstOrFail();

        $relatedBlogs = Blog::where('category_id', $blog->category_id)
            ->where('id', '!=', $blog->id)
            ->where('status', 'published')
            ->take(6)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $relatedBlogs
        ]);
    }

    /**
     * Get related workflows for a blog post.
     */
    public function relatedWorkflows($slug)
    {
        $blog = Blog::where('slug', $slug)->where('status', 'published')->firstOrFail();

        $relatedWorkflows = Workflow::where('category_id', $blog->category_id)
            ->where('status', 'published')
            ->take(4)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $relatedWorkflows
        ]);
    }

    /**
     * Get blog categories with blog counts.
     */
    public function categories()
    {
        $categories = \App\Models\BlogCategory::all();
        return response()->json($categories);
    }
}
