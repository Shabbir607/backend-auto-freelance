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
        ], 200, [], JSON_UNESCAPED_SLASHES);
    }

    /**
     * Store a newly created blog with JSON validation
     */
    public function store(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'category_id'       => 'nullable|exists:blog_categories,id',
            'author_id'         => 'nullable|exists:users,id',
            'title'             => 'required|string|max:255|unique:blogs,title',
            'slug'              => 'nullable|string|max:255|unique:blogs,slug',
            'description'       => 'nullable|string|max:500',
            'content'           => 'nullable|string',
            'image_url'         => 'nullable',
            'meta_title'        => 'nullable|string|max:255',
            'meta_description'  => 'nullable|string',
            'meta_keywords'     => 'nullable|string',
            'views'             => 'nullable|integer',
            'status'            => 'required|in:draft,published',
            'is_featured'       => 'boolean',
            'published_at'      => 'nullable|date',
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

        // Handle image upload or direct image string
        if ($request->hasFile('image_url')) {
            $this->ensureBlogImageDirectory();
            $file = $request->file('image_url');
            $extension = $file->getClientOriginalExtension() ?: 'jpg';
            $fileName = $slug . '.' . $extension;
            $path = $file->storeAs('blogs', $fileName, 'public');
            // Store absolute production URL in the DB
            $validated['image'] = 'https://api.edgelancer.com/storage/' . $path;
        } elseif ($request->filled('image_url') && is_string($request->image_url)) {
            // Priority to image field if it's a string URL
            $validated['image'] = $request->image_url;
        }
        unset($validated['image_url']); // Remove from validated array so it doesn't break create()

        $validated['author_id'] = $validated['author_id'] ?? $request->user()?->id;
        $validated['slug'] = $validated['slug'] ?? $slug;

        if (empty($validated['published_at']) && $validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $blog = Blog::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully',
            'data' => $blog->load('category'),
        ], 201, [], JSON_UNESCAPED_SLASHES);
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
        ], 200, [], JSON_UNESCAPED_SLASHES);
    }

    /**
     * Update the specified blog with JSON validation
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'category_id'       => 'sometimes|nullable|exists:blog_categories,id',
            'author_id'         => 'sometimes|nullable|exists:users,id',
            'title'             => 'sometimes|required|string|max:255|unique:blogs,title,' . $id,
            'slug'              => 'sometimes|nullable|string|max:255|unique:blogs,slug,' . $id,
            'description'       => 'sometimes|nullable|string|max:500',
            'content'           => 'sometimes|nullable|string',
            'image_url'         => 'nullable',
            'meta_title'        => 'nullable|string|max:255',
            'meta_description'  => 'nullable|string',
            'meta_keywords'     => 'nullable|string',
            'views'             => 'sometimes|nullable|integer',
            'status'            => 'sometimes|required|in:draft,published',
            'is_featured'       => 'sometimes|boolean',
            'published_at'      => 'sometimes|nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors'  => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        unset($validated['image_url']); // Remove from validated array
        
        // Merge all inputs to ensure we get all fields from the request that we might want to update
        $dataToUpdate = array_merge($request->except(['image_url', '_method']), $validated);

        // Initialize new image variable
        $newImage = null;

        // Determine if a new image is provided (File > image string)
        if ($request->hasFile('image_url')) {
            $this->ensureBlogImageDirectory();
            $file = $request->file('image_url');
            $extension = $file->getClientOriginalExtension() ?: 'jpg';
            // Use slug if available, otherwise blog title slug
            $fileSlug = isset($dataToUpdate['title']) ? Str::slug($dataToUpdate['title']) : Str::slug($blog->title);
            $fileName = $fileSlug . '.' . $extension;
            $path = $file->storeAs('blogs', $fileName, 'public');
            $newImage = 'https://api.edgelancer.com/storage/' . $path;
        } elseif ($request->filled('image_url') && is_string($request->image_url) && !empty($request->image_url)) {
            // Check if it's a new string value (not the existing one)
            if ($request->image_url !== $blog->image) {
                $newImage = $request->image_url;
            }
        }

        // If a new image was provided, handle cleanup and update
        if ($newImage !== null) {
            // Forcefully delete old local file if there was one, but ONLY if the filename is different from the new one
            if (!empty($blog->image)) {
                $oldBasename = basename($blog->image);
                $newBasename = basename($newImage);
                if ($oldBasename !== $newBasename) {
                    $oldPath = 'blogs/' . $oldBasename;
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
                }
            }
            $dataToUpdate['image'] = $newImage;
        }

        if (isset($dataToUpdate['title'])) {
            $dataToUpdate['slug'] = Str::slug($dataToUpdate['title']);
        }

        if (
            isset($dataToUpdate['status']) &&
            $dataToUpdate['status'] === 'published' &&
            $blog->status !== 'published'
        ) {
            $dataToUpdate['published_at'] = now();
        }

        $blog->update($dataToUpdate);

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog->load('category'),
        ], 200, [], JSON_UNESCAPED_SLASHES);
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
