<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectFileResource;
use App\Models\ProjectFile;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class ProjectFileController extends Controller
{
    /**
     * List project files
     */
    public function index(Request $request, int $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $this->authorize('view', $project);

            $files = $project->files()
                ->with('uploader:id,name,role') // only safe fields
                ->latest()
                ->paginate(20);

            return response()->json([
                'success' => true,
                'message' => 'Project files fetched successfully',
                'data' => ProjectFileResource::collection($files)
            ], Response::HTTP_OK);

        } catch (\Throwable $e) {
            Log::error('ProjectFile index error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch project files'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Upload a new project file
     */
    public function store(Request $request, int $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $this->authorize('update', $project);

            $validated = $request->validate([
                'file' => 'required|file|max:10240', // 10MB
                'name' => 'nullable|string|max:255',
            ]);

            DB::beginTransaction();

            $file = $request->file('file');
            $path = $file->store('project-files/' . $project->id, 'public');

            $projectFile = $project->files()->create([
                'uploader_id' => Auth::id(),
                'name' => $validated['name'] ?? $file->getClientOriginalName(),
                'path' => $path,
                'type' => $file->getClientOriginalExtension(),
                'size' => $file->getSize(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'File uploaded successfully',
                'data' => new ProjectFileResource($projectFile->load('uploader'))
            ], Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);

        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('ProjectFile store error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to upload file'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Download project file
     */
    public function download(int $id)
    {
        try {
            $file = ProjectFile::with('project')->findOrFail($id);
            $this->authorize('view', $file->project);

            if (!Storage::disk('public')->exists($file->path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File not found'
                ], Response::HTTP_NOT_FOUND);
            }

            return Storage::disk('public')->download($file->path, $file->name);

        } catch (\Throwable $e) {
            Log::error('ProjectFile download error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to download file'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
