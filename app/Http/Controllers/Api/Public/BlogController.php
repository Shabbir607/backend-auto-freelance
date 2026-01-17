<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * List published blogs
     */
    public function index(Request $request)
    {
        $blogs = Blog::published()
            ->with(['category', 'author:id,name,email']) // Select limited author fields for public
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $categorySlug) {
                $query->whereHas('category', function ($q) use ($categorySlug) {
                    $q->where('slug', $categorySlug);
                });
            })
            ->orderByDesc('is_featured') // Featured first
            ->orderByDesc('published_at')
            ->paginate($request->get('per_page', 12));

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }

    /**
     * Show single blog details
     */
    public function show($slug)
    {
        $blog = Blog::published()
            ->with(['category', 'author:id,name,email'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment Views
        $blog->increment('views');

        return response()->json([
            'success' => true,
            'data' => $blog
        ]);
    }
    
    /**
     * List categories
     */
    public function categories(Request $request)
    {
        $query = BlogCategory::where('is_active', true);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('sort_order')
            ->orderBy('title')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
}
