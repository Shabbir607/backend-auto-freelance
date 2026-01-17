<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\Milestone;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MilestoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('view', $project);

        $milestones = $project->milestones()->with('bidder')->get();
        return response()->json($milestones);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('update', $project); // Only project owner (client) should strictly create milestones, or freelancer proposal?
        // For now allowing owner/client to create milestones for a specific bidder

        $validated = $request->validate([
            'bidder_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:1',
            'reason' => 'required|string',
        ]);

        $milestone = $project->milestones()->create([
            'bidder_id' => $validated['bidder_id'],
            'amount' => $validated['amount'],
            'reason' => $validated['reason'],
            'status' => 'pending',
        ]);

        return response()->json($milestone, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $projectId, $milestoneId)
    {
        $milestone = Milestone::where('project_id', $projectId)->findOrFail($milestoneId);
        $this->authorize('update', $milestone->project);

        $validated = $request->validate([
            'status' => 'required|in:pending,active,completed,released,cancelled',
            'reason' => 'sometimes|string',
            'amount' => 'sometimes|numeric',
        ]);

        $milestone->update($validated);

        return response()->json($milestone);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($projectId, $milestoneId)
    {
        $milestone = Milestone::where('project_id', $projectId)->findOrFail($milestoneId);
        $this->authorize('update', $milestone->project);
        
        $milestone->delete();

        return response()->json(['message' => 'Milestone deleted successfully']);
    }
}
