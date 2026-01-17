<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Exception;

class JobController extends Controller
{
    /**
     * Display a listing of the jobs (projects).
     */
    public function index(Request $request)
    {
        try {
            $query = Project::with(['owner', 'client']); // Eager load relationships

            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%');
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $jobs = $query->paginate(15);

            return response()->json(['success' => true, 'data' => $jobs]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified job.
     */
    public function show($id)
    {
        try {
            $job = Project::with(['owner', 'client', 'bids'])->findOrFail($id);
            return response()->json(['success' => true, 'data' => $job]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => 'Job not found or error retrieving details.'], 404);
        }
    }

    /**
     * Update the specified job.
     */
    public function update(Request $request, $id)
    {
        try {
            $job = Project::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'status' => 'sometimes|in:active,completed,on_hold,archived',
                'priority' => 'sometimes|in:low,medium,high,urgent',
            ]);

            $job->update($validated);

            return response()->json(['success' => true, 'data' => $job, 'message' => 'Job updated successfully.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified job from storage.
     */
    public function destroy($id)
    {
        try {
            $job = Project::findOrFail($id);
            $job->delete();

            return response()->json(['success' => true, 'message' => 'Job deleted successfully.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
