<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class ProjectTaskController extends Controller
{
    /**
     * List project tasks
     */
    public function index(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('view', $project);

        $tasks = $project->tasks()
            ->with('assignedUser')
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tasks
        ]);
    }

    /**
     * Create task
     */
    public function store(Request $request, $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $this->authorize('update', $project);

            $validated = $this->validateTask($request);

            DB::beginTransaction();

            $task = $project->tasks()->create([
                ...$validated,
                'status' => $validated['status'] ?? 'todo',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Task created successfully',
                'data' => $task->load('assignedUser')
            ], Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            return $this->validationError($e);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Task store error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create task'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show single task
     */
    public function show($projectId, $id)
    {
        $task = ProjectTask::where('project_id', $projectId)->findOrFail($id);
        $this->authorize('view', $task->project);

        return response()->json([
            'success' => true,
            'data' => $task
        ]);
    }

    /**
     * Update task
     */
    public function update(Request $request, $projectId, $id)
    {
        try {
            $task = ProjectTask::findOrFail($id);
            $this->authorize('update', $task->project);

            $validated = $this->validateTask($request, true);

            $task->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Task updated successfully',
                'data' => $task->load('assignedUser')
            ]);

        } catch (ValidationException $e) {
            return $this->validationError($e);
        } catch (\Throwable $e) {
            Log::error('Task update error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update task'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete task
     */
    public function destroy($projectId, $id)
    {
        $task = ProjectTask::where('project_id', $projectId)->findOrFail($id);
        $this->authorize('update', $task->project);

        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully'
        ], Response::HTTP_OK);
    }

    /**
     * Reorder tasks
     */
    public function reorder(Request $request, $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $this->authorize('update', $project);

            $request->validate([
                'tasks' => 'required|array|min:1',
                'tasks.*.id' => 'required|exists:project_tasks,id',
                'tasks.*.order' => 'required|integer|min:0'
            ]);

            DB::beginTransaction();

            foreach ($request->tasks as $task) {
                ProjectTask::where('id', $task['id'])
                    ->where('project_id', $projectId)
                    ->update(['order' => $task['order']]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Tasks reordered successfully'
            ]);

        } catch (ValidationException $e) {
            return $this->validationError($e);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Task reorder error', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder tasks'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Shared validation
     */
    private function validateTask(Request $request, bool $isUpdate = false): array
    {
        return $request->validate([
            'title' => $isUpdate ? 'string|max:255' : 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:todo,in_progress,review,done',
            'priority' => 'nullable|in:low,medium,high,urgent',
            'due_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'order' => 'nullable|integer|min:0',
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
}
