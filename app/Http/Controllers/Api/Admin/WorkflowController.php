<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class WorkflowController extends Controller
{
    /**
     * List workflows
     */
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => Workflow::with('category')
                ->orderByDesc('created_at')
                ->paginate($request->get('per_page', 20))
        ]);
    }

 /**
 * Store workflow
 */
public function store(Request $request)
{
 
    $validator = Validator::make($request->all(), [
        'external_id' => 'nullable|string|unique:workflows,external_id',
        'category_id' => 'nullable|exists:workflow_categories,id',

        'title' => 'required|string|max:255',
        'description' => 'nullable|string',

        'difficulty' => 'nullable|in:beginner,intermediate,advanced',
        'price' => 'nullable|numeric|min:0',

        'json_data' => 'nullable|array',
        'json_file' => 'nullable|file', // ✅ existing file upload
        'json_file_url' => 'nullable|url', // ✅ NEW URL FIELD

        'workflow_features' => 'nullable|array',
        'workflow_nodes' => 'nullable|array',

        'status' => 'nullable|in:draft,published',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $validator->validated();

    /**
     * STRICT SLUG LOGIC
     */
    $slug = Str::slug($data['title']);

    if (Workflow::where('slug', $slug)->exists()) {
        return response()->json([
            'success' => false,
            'errors' => [
                'title' => ['A workflow with this title already exists.']
            ]
        ], 422);
    }

    $data['slug'] = $slug;

    /**
     * JSON FILE LOGIC (URL > FILE)
     * - If URL exists → store as json_file
     * - Else if file uploaded → store file
     */

    $data['json_file_name'] = null;
    $data['json_file_path'] = null;

    // ✅ 1) If URL provided → store it as json_file
    if ($request->filled('json_file_url')) {

        $url = $request->json_file_url;

        $data['json_file_name'] = basename(parse_url($url, PHP_URL_PATH));
        $data['json_file_path'] = $url;

    }
    // ✅ 2) Else if file uploaded → keep your old logic
    elseif ($request->hasFile('json_file')) {

        $file = $request->file('json_file');

        $storedFileName = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('workflows', $storedFileName, 'public');

        $data['json_file_name'] = $storedFileName; // ✅ EXACT name
        $data['json_file_path'] = asset('storage/' . $path);
    }

    /**
     * JSON DATA
     */
    if ($request->filled('json_data')) {
        $data['json_data'] = json_encode(
            $request->json_data,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    }

    /**
     * Encode arrays
     */
    foreach (['workflow_features', 'workflow_nodes'] as $field) {
        if (isset($data[$field])) {
            $data[$field] = json_encode(
                $data[$field],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            );
        }
    }

    $workflow = Workflow::create($data);

    return response()->json([
        'success' => true,
        'message' => 'Workflow created successfully',
        'data' => $workflow
    ], 201);
}


    /**
     * Show workflow
     */
    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Workflow::with('category')->findOrFail($id)
        ]);
    }

    /**
     * Update workflow
     */
    public function update(Request $request, $id)
    {
        $workflow = Workflow::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'external_id' => 'nullable|string|unique:workflows,external_id,' . $workflow->id,
            'category_id' => 'nullable|exists:workflow_categories,id',

            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',

            'difficulty' => 'nullable|in:beginner,intermediate,advanced',
            'price' => 'nullable|numeric|min:0',

            'json_data' => 'nullable|array',
            'json_file' => 'nullable|file|mimes:json,txt,application/json|max:10240',

            'workflow_features' => 'nullable|array',
            'workflow_nodes' => 'nullable|array',

            'status' => 'nullable|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        /**
         * STRICT TITLE  SLUG UPDATE
         */
        if (!empty($data['title'])) {
            $slug = Str::slug($data['title']);

            if (
                Workflow::where('slug', $slug)
                    ->where('id', '!=', $workflow->id)
                    ->exists()
            ) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'title' => ['A workflow with this title already exists.']
                    ]
                ], 422);
            }

            $data['slug'] = $slug;
        }

        /**
         * Replace JSON file
         */
        if ($request->hasFile('json_file')) {

            if ($workflow->json_file_path) {
                $oldPath = str_replace(url('/storage') . '/', '', $workflow->json_file_path);
                Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('json_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('workflows', $fileName, 'public');

            $data['json_file_name'] = $file->getClientOriginalName();
            $data['json_file_path'] = url(Storage::url($path));
        }

        /**
         * Update JSON data
         */
        if ($request->filled('json_data')) {
            $data['json_data'] = json_encode(
                $request->json_data,
                JSON_UNESCAPED_UNICODE
            );
        }

        /**
         * Encode arrays
         */
        foreach (['workflow_features', 'workflow_nodes'] as $field) {
            if (isset($data[$field])) {
                $data[$field] = json_encode(
                    $data[$field],
                    JSON_UNESCAPED_UNICODE
                );
            }
        }

        $workflow->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Workflow updated successfully',
            'data' => $workflow
        ]);
    }

    /**
     * Delete workflow
     */
    public function destroy($id)
    {
        $workflow = Workflow::findOrFail($id);

        if ($workflow->json_file_path) {
            $path = str_replace(url('/storage') . '/', '', $workflow->json_file_path);
            Storage::disk('public')->delete($path);
        }

        $workflow->delete();

        return response()->json([
            'success' => true,
            'message' => 'Workflow deleted successfully'
        ]);
    }
}
