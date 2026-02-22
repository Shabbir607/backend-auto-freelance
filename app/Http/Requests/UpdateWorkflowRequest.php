<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class WorkflowController extends Controller
{
    public function index(Request $request)
    {
        $query = Workflow::with(['category', 'categories', 'integrations'])->orderByDesc('created_at');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('category_id')) {
            $categories = explode(',', $request->get('category_id'));
            $query->whereHas('categories', function ($q) use ($categories) {
                $q->whereIn('workflow_categories.id', $categories);
            });
        }

        if ($request->has('min_price')) $query->where('price', '>=', $request->get('min_price'));
        if ($request->has('max_price')) $query->where('price', '<=', $request->get('max_price'));
        if ($request->has('difficulty')) $query->where('difficulty', $request->get('difficulty'));

        $workflows = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $workflows
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:workflows,slug',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:workflow_categories,id',
            'price' => 'nullable|numeric|min:0',
            'difficulty' => 'nullable|in:beginner,intermediate,advanced',
            'time_saved_value' => 'nullable|integer|min:0',
            'time_saved_unit' => 'nullable|in:minutes,hours,days',
            'roi_percentage' => 'nullable|integer|min:0',
            'nodes_count' => 'nullable|integer|min:0',
            'user_count' => 'nullable|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'status' => 'nullable|in:draft,published',
            'json_file' => 'nullable|file|mimes:json|max:10240',
            'json_data' => 'nullable|array',
            'workflow_features' => 'nullable|array',
            'workflow_nodes' => 'nullable|array',
            'integration_ids' => 'nullable|array',
            'integration_ids.*' => 'exists:workflow_integrations,id',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:workflow_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        return DB::transaction(function () use ($validated, $request) {
            $fileData = [];
            $categoriesToSync = [];

            if ($request->hasFile('json_file')) {
                $processedData = $this->handleFileUpload($request->file('json_file'));
                $fileData = $processedData['data'];
                $categoriesToSync = $processedData['categories'];
            }

            $validated = array_merge($validated, $fileData);

            if (!isset($validated['slug'])) {
                $validated['slug'] = $this->generateUniqueSlug($validated['title']);
            }

            // Create workflow
            $workflow = Workflow::create($this->sanitizePayload($validated));

            // Sync integrations
            if (!empty($validated['integration_ids'])) {
                $workflow->integrations()->sync($validated['integration_ids']);
            }

            // Sync categories: request > JSON file
            if ($request->has('category_ids')) {
                $workflow->categories()->sync($request->get('category_ids'));
            } elseif (!empty($categoriesToSync)) {
                $workflow->categories()->sync($categoriesToSync);
            }

            // Set primary category_id if not set
            if (!$workflow->category_id && $workflow->categories()->exists()) {
                $workflow->category_id = $workflow->categories()->first()->id;
                $workflow->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Workflow created successfully.',
                'data' => $workflow->load(['category', 'categories', 'integrations'])
            ], 201);
        });
    }

    public function show($id)
    {
        $workflow = Workflow::with(['category', 'categories', 'integrations'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $workflow
        ]);
    }

    public function update(Request $request, $id)
    {
        $workflow = Workflow::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:workflows,slug,' . $id,
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:workflow_categories,id',
            'price' => 'nullable|numeric|min:0',
            'difficulty' => 'nullable|in:beginner,intermediate,advanced',
            'time_saved_value' => 'nullable|integer|min:0',
            'time_saved_unit' => 'nullable|in:minutes,hours,days',
            'roi_percentage' => 'nullable|integer|min:0',
            'nodes_count' => 'nullable|integer|min:0',
            'user_count' => 'nullable|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'status' => 'nullable|in:draft,published',
            'json_file' => 'nullable|file|mimes:json|max:10240',
            'json_data' => 'nullable|array',
            'workflow_features' => 'nullable|array',
            'workflow_nodes' => 'nullable|array',
            'integration_ids' => 'nullable|array',
            'integration_ids.*' => 'exists:workflow_integrations,id',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:workflow_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        return DB::transaction(function () use ($workflow, $validated, $request) {
            if (isset($validated['title'])) {
                $validated['slug'] = $this->generateUniqueSlug($validated['title'], $workflow->id);
            }

            $categoriesToSync = [];

            if ($request->hasFile('json_file')) {
                if ($workflow->json_file_path) {
                    $relativePath = str_replace(url('/storage') . '/', '', $workflow->json_file_path);
                    $this->deleteWorkflowFile($relativePath);
                }

                $processedData = $this->handleFileUpload($request->file('json_file'));
                $fileData = $processedData['data'];
                $categoriesToSync = $processedData['categories'];
                $validated = array_merge($validated, $fileData);
            }

            $workflow->update($this->sanitizePayload($validated));

            if (array_key_exists('integration_ids', $validated)) {
                $workflow->integrations()->sync($validated['integration_ids'] ?? []);
            }

            if ($request->has('category_ids')) {
                $workflow->categories()->sync($request->get('category_ids'));
            } elseif (!empty($categoriesToSync)) {
                $workflow->categories()->sync($categoriesToSync);
            }

            // Update primary category_id if missing
            if (!$workflow->category_id && $workflow->categories()->exists()) {
                $workflow->category_id = $workflow->categories()->first()->id;
                $workflow->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Workflow updated successfully.',
                'data' => $workflow->load(['category', 'categories', 'integrations'])
            ]);
        });
    }

    public function destroy($id)
    {
        $workflow = Workflow::findOrFail($id);

        if ($workflow->json_file_path) {
            $relativePath = str_replace(url('/storage') . '/', '', $workflow->json_file_path);
            $this->deleteWorkflowFile($relativePath);
        }

        $workflow->delete();

        return response()->json([
            'success' => true,
            'message' => 'Workflow deleted successfully.'
        ], 200);
    }

    public function downloadFile($id)
    {
        $workflow = Workflow::findOrFail($id);

        $relativePath = str_replace(url('/storage') . '/', '', $workflow->json_file_path);

        if (!$workflow->json_file_path || !Storage::disk('public')->exists($relativePath)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found.'
            ], 404);
        }

        return Storage::disk('public')->download($relativePath, $workflow->json_file_name);
    }

    private function handleFileUpload($file): array
    {
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('workflows', $filename, 'public');

        $content = file_get_contents($file->getRealPath());
        $jsonData = json_decode($content, true);

        $data = [
            'json_file_name' => $file->getClientOriginalName(),
            'json_file_path' => url(Storage::url($path)),
            'json_data' => $jsonData['workflow']['workflow'] ?? $jsonData,
        ];

        $categories = [];

        if (isset($jsonData['workflow'])) {
            $meta = $jsonData['workflow'];

            if (isset($meta['id'])) $data['external_id'] = $meta['id'];
            if (isset($meta['name'])) $data['title'] = $meta['name'];
            if (isset($meta['description'])) $data['description'] = $meta['description'];
            if (isset($meta['views'])) $data['views'] = (int)$meta['views'];
            if (isset($meta['recentViews'])) $data['recent_views'] = (int)$meta['recentViews'];
            if (isset($meta['totalViews'])) $data['total_views'] = (int)$meta['totalViews'];

            if (isset($meta['categories']) && is_array($meta['categories'])) {
                foreach ($meta['categories'] as $cat) {
                    $name = is_array($cat) ? ($cat['name'] ?? null) : $cat;
                    if ($name) {
                        $category = WorkflowCategory::firstOrCreate(
                            ['slug' => Str::slug($name)],
                            ['title' => $name]
                        );
                        $categories[] = $category->id;
                    }
                }
            }
        }

        return [
            'data' => $data,
            'categories' => $categories
        ];
    }

    private function deleteWorkflowFile($path): void
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    private function sanitizePayload(array $data): array
    {
        unset($data['integration_ids'], $data['category_ids'], $data['json_file']);
        return $data;
    }

    private function generateUniqueSlug(string $title, $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        while (Workflow::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $original . '-' . $count++;
        }

        return $slug;
    }
}
