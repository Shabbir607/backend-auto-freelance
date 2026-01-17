<?php

namespace App\Http\Controllers\Api\JobBoard;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Candidate::query();

        if ($request->has('keyword')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->keyword . '%');
            });
        }

        $candidates = $query->with(['user', 'profession', 'experience', 'education'])->paginate(10);

        return response()->json($candidates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'website' => 'nullable|url',
        ]);

        $candidate = Candidate::create($validated);

        return response()->json($candidate, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $candidate = Candidate::with(['user', 'profession', 'experience', 'education', 'appliedJobs'])->findOrFail($id);
        return response()->json($candidate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $candidate = Candidate::findOrFail($id);

        $validated = $request->validate([
            'title' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'website' => 'nullable|url',
            'bio' => 'nullable|string',
            'marital_status' => 'nullable|string',
            'birth_date' => 'nullable|date',
        ]);

        $candidate->update($validated);

        return response()->json($candidate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->delete();

        return response()->json(['message' => 'Candidate deleted successfully']);
    }
}
