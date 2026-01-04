<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\ProjectTask;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectTaskController extends Controller
{
    public function index(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('view', $project);

        $tasks = $project->tasks()->orderBy('order')->get();
        return response()->json($tasks);
    }

    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('update', $project);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,review,done',
            'priority' => 'in:low,medium,high,urgent',
            'due_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'order' => 'integer',
        ]);

        $task = $project->tasks()->create($validated);

        return response()->json($task->load('assignedUser'), 201);
    }

    public function update(Request $request, $id)
    {
        $task = ProjectTask::findOrFail($id);
        $this->authorize('update', $task->project);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,review,done',
            'priority' => 'in:low,medium,high,urgent',
            'due_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'order' => 'integer',
        ]);

        $task->update($validated);

        return response()->json($task->load('assignedUser'));
    }

    public function destroy($id)
    {
        $task = ProjectTask::findOrFail($id);
        $this->authorize('update', $task->project);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function reorder(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('update', $project);

        $request->validate([
            'tasks' => 'required|array',
            'tasks.*.id' => 'required|exists:project_tasks,id',
            'tasks.*.order' => 'required|integer',
        ]);

        foreach ($request->tasks as $taskData) {
            ProjectTask::where('id', $taskData['id'])
                ->where('project_id', $projectId)
                ->update(['order' => $taskData['order']]);
        }

        return response()->json(['message' => 'Tasks reordered successfully']);
    }
}
