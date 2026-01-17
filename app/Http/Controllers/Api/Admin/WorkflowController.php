<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class WorkflowController extends Controller
{
    /**
     * List workflows
     */
    public function index(Request $request)
    {
        $query = Workflow::with(['category', 'categories', 'integrations'])
            ->orderByDesc('created_at');

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by Category
        if ($request->has('category_id')) {
            $categories = explode(',', $request->get('category_id'));
            $query->whereHas('categories', function ($q) use ($categories) {
                $q->whereIn('workflow_categories.id', $categories);
            });
        }

        // Filter by Price Range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }

        // Filter by Difficulty
        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->get('difficulty'));
        }

        $workflows = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $workflows
        ]);
    }

    /**
     * Store workflow
     */
    public function store(\App\Http\Requests\StoreWorkflowRequest $request)
    {
        $validated = $request->validated();

        return DB::transaction(function () use ($validated, $request) {
            $fileData = [];
            $categoriesToSync = [];

            // Handle File Upload
            if ($request->hasFile('json_file')) {
                $processedData = $this->handleFileUpload($request->file('json_file'));
                $fileData = $processedData['data'];
                $categoriesToSync = $processedData['categories']; // Configured category IDs from JSON
            }

            // Merge file data with request data, allowing request data to override if necessary
            // But strict file fields like external_id should probably come from file if not explicitly set
            $validated = array_merge($validated, $fileData);

            // Generate slug if not present or needs uniqueness
            if (!isset($validated['slug'])) {
                $validated['slug'] = $this->generateUniqueSlug($validated['title']);
            }

            // Check if workflow exists by external_id
            if (isset($validated['external_id'])) {
                $workflow = Workflow::where('external_id', $validated['external_id'])->first();
                if ($workflow) {
                     // Update existing
                     $workflow->update($this->sanitizePayload($validated));
                } else {
                     // Create new
                     $workflow = Workflow::create($this->sanitizePayload($validated));
                }
            } else {
                $workflow = Workflow::create($this->sanitizePayload($validated));
            }

            // Sync Integrations
            if (!empty($validated['integration_ids'])) {
                $workflow->integrations()->sync($validated['integration_ids']);
            }

            // Sync Categories (from file or request)
            // Priority: Request categories > File categories
            if ($request->has('category_ids')) {
                 $workflow->categories()->sync($request->get('category_ids'));
            } elseif (!empty($categoriesToSync)) {
                 $workflow->categories()->sync($categoriesToSync);
            }

            // Also update primary category_id if available
            if (!$workflow->category_id && $workflow->categories()->exists()) {
                $workflow->category_id = $workflow->categories()->first()->id;
                $workflow->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Workflow saved successfully.',
                'data' => $workflow->load(['category', 'categories', 'integrations'])
            ], 201);
        });
    }

    /**
     * Show workflow
     */
    public function show($id)
    {
        $workflow = Workflow::with(['category', 'categories', 'integrations'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $workflow
        ]);
    }

    /**
     * Update workflow
     */
    public function update(\App\Http\Requests\UpdateWorkflowRequest $request, $id)
    {
        $workflow = Workflow::findOrFail($id);
        $validated = $request->validated();

        return DB::transaction(function () use ($workflow, $validated, $request) {
            
            if (isset($validated['title'])) {
                $validated['slug'] = $this->generateUniqueSlug(
                    $validated['title'],
                    $workflow->id
                );
            }

            $categoriesToSync = [];

            // Handle File Upload
            if ($request->hasFile('json_file')) {
                // Delete old file if exists
                if ($workflow->json_file_path) {
                    $this->deleteWorkflowFile($workflow->json_file_path);
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

             // Sync Categories
             if ($request->has('category_ids')) {
                 $workflow->categories()->sync($request->get('category_ids'));
            } elseif (!empty($categoriesToSync)) {
                // Only sync from file if explicitly updating file and not overriding via API
                 $workflow->categories()->sync($categoriesToSync);
            }

            return response()->json([
                'success' => true,
                'message' => 'Workflow updated successfully.',
                'data' => $workflow->load(['category', 'categories', 'integrations'])
            ]);
        });
    }

    /**
     * Delete workflow
     */
    public function destroy($id)
    {
        $workflow = Workflow::findOrFail($id);
        
        // Delete file if exists
        if ($workflow->json_file_path) {
            $this->deleteWorkflowFile($workflow->json_file_path);
        }
        
        $workflow->delete();

        return response()->json([
            'success' => true,
            'message' => 'Workflow deleted successfully.'
        ], 204);
    }

    /**
     * Download workflow JSON file
     */
    public function downloadFile($id)
    {
        $workflow = Workflow::findOrFail($id);

        if (!$workflow->json_file_path || !\Illuminate\Support\Facades\Storage::disk('public')->exists($workflow->json_file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found.'
            ], 404);
        }

        return \Illuminate\Support\Facades\Storage::disk('public')->download(
            $workflow->json_file_path,
            $workflow->json_file_name
        );
    }

    /**
     * Handle file upload and return data
     */
    private function handleFileUpload($file): array
    {
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('workflows', $filename, 'public');
        
        // Parse JSON content
        $content = file_get_contents($file->getRealPath());
        $jsonData = json_decode($content, true);

        // Extract metadata from JSON wrapper if present
        $data = [
            'json_file_name' => $file->getClientOriginalName(),
            'json_file_path' => $path,
            'json_data' => $jsonData['workflow']['workflow'] ?? $jsonData, // Handle nested wrapper
        ];
        
        $categories = [];

        // Parse outer wrapper metadata
        if (isset($jsonData['workflow'])) {
            $meta = $jsonData['workflow'];
            
            // Map Basic Info
            if (isset($meta['id'])) $data['external_id'] = $meta['id'];
            if (isset($meta['name'])) $data['title'] = $meta['name'];
            if (isset($meta['description'])) $data['description'] = $meta['description'];
            
            // Map Views
            if (isset($meta['views'])) $data['views'] = (int)$meta['views'];
            if (isset($meta['recentViews'])) $data['recent_views'] = (int)$meta['recentViews'];
            if (isset($meta['totalViews'])) $data['total_views'] = (int)$meta['totalViews'];

            // Map Categories
            if (isset($meta['categories']) && is_array($meta['categories'])) {
                foreach ($meta['categories'] as $cat) {
                    if (isset($cat['id'])) {
                         // Find or create category by external ID or Name? 
                         // For now, assuming we match by name or create
                         // But n8n categories might not match our system. 
                         // Let's try to find by name, or fall back to a default.
                         // Actually, user request didn't specify mapping logic, 
                         // but "data categories each data proerply".
                         // Let's assume we create them if they don't exist.
                         
                         $category = \App\Models\WorkflowCategory::firstOrCreate(
                             ['slug' => Str::slug($cat['name'])],
                             ['title' => $cat['name']]
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

    /**
     * Delete workflow file
     */
    private function deleteWorkflowFile($path): void
    {
        if (\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
        }
    }

    /**
     * Ensure clean payload
     */
    private function sanitizePayload(array $data): array
    {
        unset($data['integration_ids']);
        unset($data['category_ids']); // Remove from direct update
        unset($data['json_file']); 
        return $data;
    }

    /**
     * Unique slug generator
     */
    private function generateUniqueSlug(string $title, $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        while (
            Workflow::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $original . '-' . $count++;
        }

        return $slug;
    }
}
