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
        $directory = storage_path('app/public/blogs');
        
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        if (!is_writable($directory)) {
            @chmod($directory, 0755);
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
            'image'             => 'nullable', // Allow file upload
            'image_url'         => 'nullable|string', // Allow direct URL
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

        // Handle image upload, direct image_url, or image string
        if ($request->hasFile('image')) {
            $this->ensureBlogImageDirectory();
            $path = $request->file('image')->store('blogs', 'public');
            // Store absolute URL in the DB
            $validated['image'] = Storage::disk('public')->url($path);
        } elseif ($request->filled('image_url')) {
            // Priority to image_url if provided
            $validated['image'] = $request->image_url;
        } elseif ($request->filled('image') && is_string($request->image)) {
            // Fallback to image field if it's a string
            $validated['image'] = $request->image;
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
            'image'             => 'nullable', // Allow file upload
            'image_url'         => 'nullable|string', // Allow direct URL
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

        // Initialize new image variable
        $newImage = null;

        // Determine if a new image is provided (File > image_url > image string)
        if ($request->hasFile('image')) {
            $this->ensureBlogImageDirectory();
            $path = $request->file('image')->store('blogs', 'public');
            $newImage = Storage::disk('public')->url($path);
        } elseif ($request->filled('image_url')) {
            $newImage = $request->image_url;
        } elseif ($request->filled('image') && is_string($request->image) && !empty($request->image)) {
            // Check if it's a new string value (not the existing one)
            if ($request->image !== $blog->image) {
                $newImage = $request->image;
            }
        }

        // If a new image was provided, handle cleanup and update
        if ($newImage !== null) {
            // Try to delete old local file if it exists and we're changing it
            if ($blog->image && str_contains($blog->image, 'storage/blogs')) {
                // Correctly extract path for Storage::delete
                // Example: http://domain.com/storage/blogs/xyz.jpg -> blogs/xyz.jpg
                $oldPath = 'blogs/' . basename($blog->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $validated['image'] = $newImage;
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
