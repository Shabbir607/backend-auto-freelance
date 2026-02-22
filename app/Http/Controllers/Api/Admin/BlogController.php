<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    /**
     * Ensure blogs directory exists with safe permissions
     */
    private function ensureBlogImageDirectory(): void
    {
        $disk = Storage::disk('public');
        $directory = 'blogs';

        if (! $disk->exists($directory)) {
            $disk->makeDirectory($directory);

            $fullPath = storage_path('app/public/' . $directory);
            if (File::exists($fullPath)) {
                @chmod($fullPath, 0755);
            }
        }
    }

    /**
     * Display a listing of blogs
     */
    public function index(Request $request)
    {
        $blogs = Blog::with(['category', 'author'])
            ->when($request->search, fn ($q) =>
                $q->where('title', 'like', "%{$request->search}%")
            )
            ->when($request->status, fn ($q) =>
                $q->where('status', $request->status)
            )
            ->when($request->category_id, fn ($q) =>
                $q->where('category_id', $request->category_id)
            )
            ->latest()
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $blogs,
        ]);
    }

    /**
     * Store a newly created blog with JSON validation
     */
    public function store(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'category_id'       => 'required|exists:blog_categories,id',
            'title'             => 'required|string|max:255|unique:blogs,title',
            'description'       => 'required|string|max:500',
            'content'           => 'required|string',
            'image'             => 'nullable|image|max:5120',
            'meta_title'        => 'nullable|string|max:255',
            'meta_description'  => 'nullable|string',
            'meta_keywords'     => 'nullable|string',
            'status'            => 'required|in:draft,published',
            'is_featured'       => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors'  => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // Generate slug
        $slug = Str::slug($validated['title']);
        if (Blog::where('slug', $slug)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Slug already exists',
                'errors'  => ['slug' => ['Slug already exists']]
            ], 409);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $this->ensureBlogImageDirectory();
            $validated['image'] = $request->file('image')->store('blogs', 'public');
        }

        $validated['slug'] = $slug;
        $validated['author_id'] = $request->user()?->id;

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $blog = Blog::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully',
            'data' => $blog->load('category'),
        ], 201);
    }

    /**
     * Display the specified blog
     */
    public function show($id)
    {
        $blog = Blog::with(['category', 'author'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $blog,
        ]);
    }

    /**
     * Update the specified blog with JSON validation
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'category_id'       => 'sometimes|required|exists:blog_categories,id',
            'title'             => 'sometimes|required|string|max:255|unique:blogs,title,' . $id,
            'description'       => 'sometimes|required|string|max:500',
            'content'           => 'sometimes|required|string',
            'image'             => 'nullable|image|max:5120',
            'meta_title'        => 'nullable|string|max:255',
            'meta_description'  => 'nullable|string',
            'meta_keywords'     => 'nullable|string',
            'status'            => 'sometimes|required|in:draft,published',
            'is_featured'       => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors'  => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // Image update
        if ($request->hasFile('image')) {
            $this->ensureBlogImageDirectory();

            if ($blog->image && Storage::disk('public')->exists($blog->image)) {
                Storage::disk('public')->delete($blog->image);
            }

            $validated['image'] = $request->file('image')->store('blogs', 'public');
        }

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if (
            isset($validated['status']) &&
            $validated['status'] === 'published' &&
            $blog->status !== 'published'
        ) {
            $validated['published_at'] = now();
        }

        $blog->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog->load('category'),
        ]);
    }

    /**
     * Remove the specified blog
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
            'message' => 'Blog deleted successfully',
        ]);
    }
}
