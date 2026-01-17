<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $blogs = Blog::with(['category', 'author'])
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->category_id, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->orderByDesc('created_at')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:blog_categories,id',
            'title' => 'required|string|max:255|unique:blogs,title',
            'description' => 'required|string|max:500', // Excerpt
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120', // 5MB
            
            // SEO
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            
            'status' => 'required|in:draft,published',
            'is_featured' => 'boolean',
        ]);

        // Handle Image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $validated['image'] = $path;
        }

        $validated['slug'] = Str::slug($validated['title']);
        $validated['author_id'] = $request->user()->id ?? null;
        
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $blog = Blog::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully.',
            'data' => $blog->load('category')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blog::with(['category', 'author'])->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:blog_categories,id',
            'title' => 'sometimes|required|string|max:255|unique:blogs,title,' . $id,
            'description' => 'sometimes|required|string|max:500',
            'content' => 'sometimes|required|string',
            'image' => 'nullable|image|max:5120',
            
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            
            'status' => 'sometimes|required|in:draft,published',
            'is_featured' => 'boolean',
        ]);

        // Handle Image
        if ($request->hasFile('image')) {
            // Delete old
            if ($blog->image && Storage::disk('public')->exists($blog->image)) {
                Storage::disk('public')->delete($blog->image);
            }
            
            $path = $request->file('image')->store('blogs', 'public');
            $validated['image'] = $path;
        }

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        // Update published_at if status changes to published and wasn't before
        if (isset($validated['status']) && $validated['status'] === 'published' && $blog->status !== 'published') {
            $validated['published_at'] = now();
        }

        $blog->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully.',
            'data' => $blog->load('category')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        
        if ($blog->image && Storage::disk('public')->exists($blog->image)) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog deleted successfully.'
        ], 204);
    }
}
