<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use App\Notifications\ProjectNotification;

class ProjectController extends Controller
{
    /**
     * List projects accessible to user
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'status' => 'nullable|in:active,completed,on_hold,archived'
            ]);

            $user = Auth::user();

            $projects = Project::query()
                ->when($request->status, fn ($q) =>
                    $q->where('status', $request->status)
                )
                ->where(function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                      ->orWhere('client_id', $user->id)
                      ->orWhereHas('users', fn ($q) =>
                          $q->where('users.id', $user->id)
                      );
                })
                ->with(['users', 'client', 'tasks'])
                ->latest()
                ->paginate(10);

            return response()->json([
                'success' => true,
                'message' => 'Projects fetched successfully',
                'data' => $projects
            ]);

        } catch (\Throwable $e) {
            Log::error('Project index error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch projects'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create project
     */
    public function store(Request $request)
    {
        try {
            $validated = $this->validateProject($request);

            DB::beginTransaction();

            $validated['user_id'] = Auth::id();
            $validated['status'] ??= 'active';

            $project = Project::create($validated);

            if (!empty($validated['team_members'])) {
                $project->users()->sync($validated['team_members']);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Project created successfully',
                'data' => $project->load(['users', 'client'])
            ], Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            return $this->validationError($e);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Project store error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create project'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show project
     */
    public function show($id)
    {
        $project = Project::with([
            'users',
            'client',
            'tasks.assignedUser',
            'updates.user',
            'files.uploader',
            'meetings.attendees'
        ])->findOrFail($id);

        $this->authorize('view', $project);

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }

    /**
     * Update project
     */
    public function update(Request $request, $id)
    {
        try {
            $project = Project::findOrFail($id);
            $this->authorize('update', $project);

            $validated = $this->validateProject($request, $project->id);

            DB::beginTransaction();

            $oldStatus = $project->status;
            $project->update($validated);

            if (isset($validated['team_members'])) {
                $project->users()->sync($validated['team_members']);
            }

            DB::commit();

            // Notify on status change
            if ($oldStatus !== $project->status) {
                $this->notifyStatusChange($project);
            }

            return response()->json([
                'success' => true,
                'message' => 'Project updated successfully',
                'data' => $project->load(['users', 'client'])
            ]);

        } catch (ValidationException $e) {
            return $this->validationError($e);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Project update error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update project'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete project
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $this->authorize('delete', $project);

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ], Response::HTTP_OK);
    }

    /**
     * Shared validation logic
     */
    private function validateProject(Request $request, $projectId = null): array
    {
        return $request->validate([
            'name' => $projectId ? 'string|max:255' : 'required|string|max:255',
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

            'freelancer_project_id' =>
                'nullable|integer|unique:projects,freelancer_project_id,' . $projectId,

            'seo_url' => 'nullable|string',
            'currency' => 'nullable|array',
            'hourly_project_info' => 'nullable|array',
            'bid_stats' => 'nullable|array',
            'upgrades' => 'nullable|array',
            'qualifications' => 'nullable|array',
            'attachments' => 'nullable|array',
            'location' => 'nullable|array',
            'freelancer_location' => 'nullable|array',

            'deleted' => 'boolean',
            'featured' => 'boolean',
            'urgent' => 'boolean',
            'hireme' => 'boolean',
            'local' => 'boolean',
            'negotiated' => 'boolean',
            'is_escrow_project' => 'boolean',
            'is_seller_kyc_required' => 'boolean',
            'is_buyer_kyc_required' => 'boolean'
        ]);
    }

    /**
     * Validation error response
     */
    private function validationError(ValidationException $e)
    {
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * Notify users on status change
     */
    private function notifyStatusChange(Project $project): void
    {
        $recipientIds = $project->users->pluck('id')->toArray();

        if ($project->client_id) {
            $recipientIds[] = $project->client_id;
        }

        $recipients = User::whereIn('id', array_unique($recipientIds))->get();

        if ($recipients->isNotEmpty()) {
            Notification::send(
                $recipients,
                new ProjectNotification('status_updated', $project)
            );
        }
    }
}
