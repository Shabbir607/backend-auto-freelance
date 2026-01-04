<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by user access (owner, client, or team member)
        $user = Auth::user();
        $query->where(function ($q) use ($user) {
            $q->where('user_id', $user->id)
              ->orWhere('client_id', $user->id)
              ->orWhereHas('users', function ($q) use ($user) {
                  $q->where('users.id', $user->id);
              });
        });

        return response()->json($query->with(['users', 'client', 'tasks'])->latest()->paginate(10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:active,completed,on_hold,archived',
            'priority' => 'in:low,medium,high,urgent',
            'platform' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric',
            'client_id' => 'nullable|exists:users,id',
            'team_members' => 'nullable|array',
            'team_members.*' => 'exists:users,id',
            // Freelancer Fields
            'freelancer_project_id' => 'nullable|integer|unique:projects,freelancer_project_id',
            'owner_id' => 'nullable|integer',
            'seo_url' => 'nullable|string',
            'currency' => 'nullable|array',
            'submitdate' => 'nullable|integer',
            'preview_description' => 'nullable|string',
            'deleted' => 'boolean',
            'nonpublic' => 'boolean',
            'hidebids' => 'boolean',
            'type' => 'nullable|string',
            'bidperiod' => 'nullable|integer',
            'hourly_project_info' => 'nullable|array',
            'featured' => 'boolean',
            'urgent' => 'boolean',
            'bid_stats' => 'nullable|array',
            'time_submitted' => 'nullable|integer',
            'time_updated' => 'nullable|integer',
            'upgrades' => 'nullable|array',
            'qualifications' => 'nullable|array',
            'language' => 'nullable|string',
            'attachments' => 'nullable|array',
            'hireme' => 'boolean',
            'frontend_project_status' => 'nullable|string',
            'location' => 'nullable|array',
            'local' => 'boolean',
            'negotiated' => 'boolean',
            'time_free_bids_expire' => 'nullable|integer',
            'files' => 'nullable|array',
            'pool_ids' => 'nullable|array',
            'enterprise_ids' => 'nullable|array',
            'is_escrow_project' => 'boolean',
            'is_seller_kyc_required' => 'boolean',
            'is_buyer_kyc_required' => 'boolean',
        ]);

        $validated['user_id'] = Auth::id();
        // Default status if not provided
        if (!isset($validated['status'])) {
            $validated['status'] = 'active';
        }

        $project = Project::create($validated);

        if (isset($validated['team_members'])) {
            $project->users()->sync($validated['team_members']);
        }

        return response()->json($project->load(['users', 'client']), 201);
    }

    public function show($id)
    {
        $project = Project::with(['users', 'client', 'tasks.assignedUser', 'updates.user', 'files.uploader', 'meetings.attendees'])->findOrFail($id);
        $this->authorize('view', $project);
        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:active,completed,on_hold,archived',
            'priority' => 'in:low,medium,high,urgent',
            'platform' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric',
            'client_id' => 'nullable|exists:users,id',
            'team_members' => 'nullable|array',
            'team_members.*' => 'exists:users,id',
            // Freelancer Fields
            'freelancer_project_id' => 'nullable|integer|unique:projects,freelancer_project_id,' . $id,
            'owner_id' => 'nullable|integer',
            'seo_url' => 'nullable|string',
            'currency' => 'nullable|array',
            'submitdate' => 'nullable|integer',
            'preview_description' => 'nullable|string',
            'deleted' => 'boolean',
            'nonpublic' => 'boolean',
            'hidebids' => 'boolean',
            'type' => 'nullable|string',
            'bidperiod' => 'nullable|integer',
            'hourly_project_info' => 'nullable|array',
            'featured' => 'boolean',
            'urgent' => 'boolean',
            'bid_stats' => 'nullable|array',
            'time_submitted' => 'nullable|integer',
            'time_updated' => 'nullable|integer',
            'upgrades' => 'nullable|array',
            'qualifications' => 'nullable|array',
            'language' => 'nullable|string',
            'attachments' => 'nullable|array',
            'hireme' => 'boolean',
            'frontend_project_status' => 'nullable|string',
            'location' => 'nullable|array',
            'local' => 'boolean',
            'negotiated' => 'boolean',
            'time_free_bids_expire' => 'nullable|integer',
            'files' => 'nullable|array',
            'pool_ids' => 'nullable|array',
            'enterprise_ids' => 'nullable|array',
            'is_escrow_project' => 'boolean',
            'is_seller_kyc_required' => 'boolean',
            'is_buyer_kyc_required' => 'boolean',
        ]);

        $project->update($validated);

        if (isset($validated['team_members'])) {
            $project->users()->sync($validated['team_members']);
        }

        return response()->json($project->load(['users', 'client']));
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $this->authorize('delete', $project);
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully'], 204);
    }
}
