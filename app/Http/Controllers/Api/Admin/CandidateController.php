<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;

class CandidateController extends Controller
{
    /**
     * Display a listing of the candidates (freelancers).
     */
    public function index(Request $request)
    {
        try {
            $query = User::role('freelancer');

            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('email', 'like', '%' . $request->search . '%');
            }

            $candidates = $query->paginate(15);

            return response()->json(['success' => true, 'data' => $candidates]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified candidate.
     */
    public function show($id)
    {
        try {
            $candidate = User::role('freelancer')->findOrFail($id);
            return response()->json(['success' => true, 'data' => $candidate]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => 'Candidate not found or error retrieving details.'], 404);
        }
    }

    /**
     * Update the specified candidate.
     */
    public function update(Request $request, $id)
    {
        try {
            $candidate = User::role('freelancer')->findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $id,
                // Add other fields as necessary
            ]);

            $candidate->update($validated);

            return response()->json(['success' => true, 'data' => $candidate, 'message' => 'Candidate updated successfully.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified candidate from storage.
     */
    public function destroy($id)
    {
        try {
            $candidate = User::role('freelancer')->findOrFail($id);
            $candidate->delete();

            return response()->json(['success' => true, 'message' => 'Candidate deleted successfully.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
