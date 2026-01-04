<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\ProjectFile;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectFileController extends Controller
{
    public function index(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('view', $project);

        $files = $project->files()->with('uploader')->latest()->paginate(20);
        return response()->json($files);
    }

    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('update', $project);

        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'name' => 'nullable|string|max:255',
        ]);

        $file = $request->file('file');
        // Use 'public' disk as in the original root controller to ensure accessibility
        $path = $file->store('project-files/' . $project->id, 'public');

        $projectFile = $project->files()->create([
            'uploader_id' => Auth::id(),
            'name' => $request->name ?? $file->getClientOriginalName(),
            'path' => $path,
            'type' => $file->getClientOriginalExtension(), // Using extension to match root controller logic which might be expected by frontend
            'size' => $file->getSize(),
        ]);

        return response()->json($projectFile, 201);
    }

    public function download($id)
    {
        $file = ProjectFile::findOrFail($id);
        $this->authorize('view', $file->project);

        return Storage::download($file->path, $file->name);
    }
}
