<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\DailyUpdate;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use App\Notifications\ProjectNotification;

class DailyUpdateController extends Controller
{
    /**
     * List daily updates for a project
     */
    public function index(Request $request, $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $this->authorize('view', $project);

            $updates = $project->updates()
                ->with('user')
                ->latest()
                ->paginate(20);

            return response()->json([
                'success' => true,
                'message' => 'Daily updates fetched successfully',
                'data' => $updates
            ]);

        } catch (\Throwable $e) {
            Log::error('DailyUpdate index error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch daily updates'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create daily update
     */
    public function store(Request $request, $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);

            // Owner OR team member OR policy-allowed
            if (
                $project->user_id !== Auth::id() &&
                !$project->users()->where('users.id', Auth::id())->exists()
            ) {
                $this->authorize('view', $project);
            }

            $validated = $this->validateUpdate($request);

            DB::beginTransaction();

            $update = $project->updates()->create([
                'user_id' => Auth::id(),
                'content' => $validated['content'],
                'date' => $validated['date'],
                'attachments' => $validated['attachments'] ?? []
            ]);

            DB::commit();

            $this->notifyStakeholders($project, $update);

            return response()->json([
                'success' => true,
                'message' => 'Daily update created successfully',
                'data' => $update->load('user')
            ], Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            return $this->validationError($e);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('DailyUpdate store error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create daily update'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Validation rules
     */
    private function validateUpdate(Request $request): array
    {
        return $request->validate([
            'content' => 'required|string|max:5000',
            'date' => 'required|date',
            'attachments' => 'nullable|array'
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
     * Notify project owner & client
     */
    private function notifyStakeholders(Project $project, DailyUpdate $update): void
    {
        $recipientIds = [];

        if ($project->client_id && $project->client_id !== Auth::id()) {
            $recipientIds[] = $project->client_id;
        }

        if ($project->user_id !== Auth::id()) {
            $recipientIds[] = $project->user_id;
        }

        if (!empty($recipientIds)) {
            $recipients = User::whereIn('id', array_unique($recipientIds))->get();

            if ($recipients->isNotEmpty()) {
                \Illuminate\Support\Facades\Notification::send(
                    $recipients,
                    new ProjectNotification('daily_update', $update)
                );
            }
        }
    }
}
