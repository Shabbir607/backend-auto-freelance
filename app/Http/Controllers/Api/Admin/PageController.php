<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * List all pages.
     */
    public function index()
    {
        $pages = Page::orderBy('title')->get();
        
        return response()->json([
            'success' => true,
            'data' => $pages
        ]);
    }

    /**
     * Store a newly created Page.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug',
            'content' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'meta_tags' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $page = Page::create($validated);

        return response()->json([
            'success' => true,
            'data' => $page,
            'message' => 'Page created successfully',
        ], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show(Page $page)
    {
        return response()->json([
            'success' => true,
            'data' => $page->load('faqs'),
        ]);
    }

    /**
     * Update the specified Page.
     */
    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:pages,slug,' . $page->id,
            'content' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'meta_tags' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $page->update($validated);

        return response()->json([
            'success' => true,
            'data' => $page,
            'message' => 'Page updated successfully',
        ]);
    }

    /**
     * Remove the specified Page.
     */
    public function destroy(Page $page)
    {
        $page->delete();

        return response()->json([
            'success' => true,
            'message' => 'Page deleted successfully',
        ]);
    }
}
