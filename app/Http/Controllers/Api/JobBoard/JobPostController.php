<?php

namespace App\Http\Controllers\Api\JobBoard;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Illuminate\Http\Request;

class JobPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JobPost::query();

        if ($request->has('keyword')) {
            $query->where('title', 'like', '%' . $request->keyword . '%');
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('job_type_id')) {
            $query->where('job_type_id', $request->job_type_id);
        }

        $jobs = $query->with(['company', 'category', 'job_type', 'salary_type'])->paginate(10);

        return response()->json($jobs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company_id' => 'required|exists:companies,id',
            'category_id' => 'required|exists:job_categories,id',
            'role_id' => 'required|exists:job_roles,id',
            'experience_id' => 'required|exists:experiences,id',
            'education_id' => 'required|exists:education,id',
            'job_type_id' => 'required|exists:job_types,id',
            'salary_type_id' => 'required|exists:salary_types,id',
            'vacancies' => 'required|string',
            'min_salary' => 'required|integer',
            'max_salary' => 'required|integer',
            'deadline' => 'required|date',
            'description' => 'required|string',
        ]);

        $job = JobPost::create($validated);

        return response()->json($job, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $job = JobPost::with(['company', 'category', 'job_type', 'salary_type', 'role', 'experience', 'education', 'tags', 'benefits', 'skills'])->findOrFail($id);
        return response()->json($job);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $job = JobPost::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'vacancies' => 'sometimes|string',
            'min_salary' => 'sometimes|integer',
            'max_salary' => 'sometimes|integer',
            'deadline' => 'sometimes|date',
            'description' => 'sometimes|string',
        ]);

        $job->update($validated);

        return response()->json($job);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $job = JobPost::findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job deleted successfully']);
    }
}
