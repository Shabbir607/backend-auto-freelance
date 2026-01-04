<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\DailyUpdate;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DailyUpdateController extends Controller
{
    public function index(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('view', $project);

        $updates = $project->updates()->with('user')->latest()->paginate(20);
        return response()->json($updates);
    }

    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        
        // Allow team members to post updates
        if (!$project->users->contains(Auth::id()) && $project->user_id !== Auth::id()) {
            $this->authorize('view', $project); // Fallback to policy if manual check fails or for consistency
        }

        $validated = $request->validate([
            'content' => 'required|string',
            'date' => 'required|date',
            'attachments' => 'nullable|array',
        ]);

        $update = $project->updates()->create([
            'user_id' => Auth::id(),
            'content' => $validated['content'],
            'date' => $validated['date'],
            'attachments' => $validated['attachments'] ?? [],
        ]);

        return response()->json($update->load('user'), 201);
    }
}
