<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = BlogCategory::query()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->orderBy('sort_order')
            ->orderBy('title')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:blog_categories,title',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blog_categories', 'public');
            $validated['image'] = url(Storage::url($path));
        }

        $validated['slug'] = Str::slug($validated['title']);

        $category = BlogCategory::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully.',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = BlogCategory::withCount('blogs')->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = BlogCategory::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255|unique:blog_categories,title,' . $id,
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            // Delete old
             if ($category->image) {
                // Extract relative path from URL
                $relativePath = str_replace(url('/storage').'/', '', $category->image);
                if (Storage::disk('public')->exists($relativePath)) {
                    Storage::disk('public')->delete($relativePath);
                }
            }

            $path = $request->file('image')->store('blog_categories', 'public');
            $validated['image'] = url(Storage::url($path));
        }

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully.',
            'data' => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = BlogCategory::findOrFail($id);
        
        // Optional: Check if has blogs or force delete cascade
        if ($category->blogs()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category with associated blogs.'
            ], 400);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully.'
        ], 204);
    }
}
