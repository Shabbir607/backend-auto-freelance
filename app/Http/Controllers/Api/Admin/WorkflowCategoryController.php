<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WorkflowCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class WorkflowCategoryController extends Controller
{
    /**
     * List workflow categories (paginated)
     */
    public function index(Request $request)
    {
        $categories = WorkflowCategory::orderBy('sort_order', 'asc')
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Store new workflow category
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255|unique:workflow_categories,title',
            'icon'        => 'nullable|string|max:255',
            'badge_text'  => 'nullable|string|max:255',
            'sort_order'  => 'nullable|integer|min:0',
            'is_active'   => 'nullable|boolean',
        ]);

        $validated['slug'] = $this->generateUniqueSlug($validated['title']);

        // Handle Icon Upload
        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('workflow_categories', 'public');
            $validated['icon'] = url(Storage::url($path));
        }

        $category = WorkflowCategory::create([
            'title'      => $validated['title'],
            'slug'       => $validated['slug'],
            'icon'       => $validated['icon'] ?? null,
            'badge_text' => $validated['badge_text'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active'  => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Workflow category created successfully.',
            'data'    => $category
        ], 201);
    }

    /**
     * Show single category
     */
    public function show($id)
    {
        $category = WorkflowCategory::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    /**
     * Update category
     */
    public function update(Request $request, $id)
    {
        $category = WorkflowCategory::findOrFail($id);

        $validated = $request->validate([
            'title' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('workflow_categories', 'title')->ignore($category->id),
            ],
            'icon'       => 'nullable|string|max:255',
            'badge_text' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active'  => 'nullable|boolean',
        ]);

        // Handle Icon Upload
        if ($request->hasFile('icon')) {
             if ($category->icon) {
                $relativePath = str_replace(url('/storage').'/', '', $category->icon);
                if (Storage::disk('public')->exists($relativePath)) {
                    Storage::disk('public')->delete($relativePath);
                }
            }
            $path = $request->file('icon')->store('workflow_categories', 'public');
            $validated['icon'] = url(Storage::url($path));
        }

        if (isset($validated['title'])) {
            $validated['slug'] = $this->generateUniqueSlug(
                $validated['title'],
                $category->id
            );
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Workflow category updated successfully.',
            'data'    => $category
        ]);
    }

    /**
     * Delete category
     */
    public function destroy($id)
    {
        $category = WorkflowCategory::findOrFail($id);
        
        if ($category->icon) {
            $relativePath = str_replace(url('/storage').'/', '', $category->icon);
            if (Storage::disk('public')->exists($relativePath)) {
                Storage::disk('public')->delete($relativePath);
            }
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Workflow category deleted successfully.'
        ], 204);
    }

    /**
     * Generate unique slug
     */
    private function generateUniqueSlug(string $title, $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (
            WorkflowCategory::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $originalSlug . '-' . $count++;
        }

        return $slug;
    }
}
