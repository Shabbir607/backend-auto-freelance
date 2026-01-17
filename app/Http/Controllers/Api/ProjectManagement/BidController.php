<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\Bid;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        //$this->authorize('view', $project); // Optional: if bids are private

        $bids = $project->bids()->with('bidder')->paginate(10);
        return response()->json($bids);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        
        // Prevent owner from bidding on own project
        if ($project->user_id == Auth::id()) {
            return response()->json(['message' => 'Project owner cannot bid on their own project.'], 403);
        }

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'period' => 'required|integer|min:1', // Days
            'description' => 'required|string',
        ]);

        $bid = $project->bids()->create([
            'bidder_id' => Auth::id(),
            'amount' => $validated['amount'],
            'period' => $validated['period'],
            'description' => $validated['description'],
            'status' => 'pending'
        ]);

        return response()->json($bid, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $projectId, $bidId)
    {
        $project = Project::findOrFail($projectId);
        $bid = Bid::where('project_id', $projectId)->findOrFail($bidId);
        
        $this->authorize('update', $project); // Only project owner can update bid status (Accept/Reject)

        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $bid->update($validated);

        if ($validated['status'] === 'accepted') {
            // Assign project to bidder?
            // For now, let's keep it simple. Future rule: Set project status to active/assigned.
        }

        return response()->json($bid);
    }
}
