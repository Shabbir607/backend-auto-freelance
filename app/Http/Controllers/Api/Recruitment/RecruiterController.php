<?php

namespace App\Http\Controllers\Api\Recruitment;

use App\Http\Controllers\Controller;
use App\Models\Interview;
use App\Models\JobPost;
use App\Models\Candidate;
use App\Models\Company;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RecruiterController extends Controller
{
    /**
     * Post a new Job
     */
    public function postJob(Request $request)
    {
        // Ensure user has a company
        $company = Company::where('user_id', Auth::id())->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string',
            'category_id' => 'required|exists:job_categories,id',
            'role_id' => 'required|exists:job_roles,id',
            'experience_id' => 'required|exists:experiences,id',
            'education_id' => 'required|exists:education,id',
            'job_type_id' => 'required|exists:job_types,id',
            'salary_type_id' => 'required|exists:salary_types,id',
            'vacancies' => 'required|integer|min:1',
            'min_salary' => 'required|integer',
            'max_salary' => 'required|integer',
            'deadline' => 'required|date',
            'description' => 'required|string',
        ]);

        $job = JobPost::create(array_merge($validated, [
            'company_id' => $company->id,
            'status' => 'active', // default active for recruiter
            'slug' => Str::slug($validated['title']) . '-' . time()
        ]));

        return response()->json($job, 201);
    }

    /**
     * View Applications for a Job
     */
    public function viewApplications($jobId)
    {
        $company = Company::where('user_id', Auth::id())->first();
        $job = JobPost::where('company_id', $company->id)->findOrFail($jobId);

        $applications = $job->appliedJobs()->with('user')->get(); // Candidate model should map to User via 'user' relation or direct attributes
        
        return response()->json($applications);
    }

    /**
     * Schedule an Interview
     */
    public function scheduleInterview(Request $request, $jobId)
    {
        $company = Company::where('user_id', Auth::id())->first();
        JobPost::where('company_id', $company->id)->findOrFail($jobId); // Verify ownership

        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'scheduled_at' => 'required|date', // 'Y-m-d H:i:s'
            'meeting_link' => 'nullable|string',
            'notes' => 'nullable|string'
        ]);

        $interview = Interview::create([
            'job_id' => $jobId,
            'candidate_id' => $validated['candidate_id'],
            'interviewer_id' => Auth::id(),
            'scheduled_at' => $validated['scheduled_at'],
            'status' => 'scheduled',
            'meeting_link' => $request->meeting_link,
            'notes' => $request->notes
        ]);

        return response()->json($interview, 201);
    }

    /**
     * Hire a Candidate (Create Project Contract)
     */
    public function hireCandidate(Request $request, $jobId)
    {
         $company = Company::where('user_id', Auth::id())->first();
         $job = JobPost::where('company_id', $company->id)->findOrFail($jobId);

         $validated = $request->validate([
             'candidate_id' => 'required|exists:candidates,id',
             'budget' => 'required|numeric',
             'deadline' => 'required|date'
         ]);
         
         $candidate = Candidate::findOrFail($validated['candidate_id']);

         // Create Project
         $project = Project::create([
             'user_id' => Auth::id(), // Owner is Recruiter
             'name' => 'Hired: ' . $job->title . ' - ' . $candidate->title,
             'description' => 'Project created upon hiring for job: ' . $job->title,
             'status' => 'active',
             'budget' => $validated['budget'],
             'end_date' => $validated['deadline'],
             'external_metadata' => ['source_job_id' => $job->id]
         ]);

         // Assign Candidate to Project
         // Assuming project_user pivot or direct assignment logic
         // For now, we will use project_user if consistent with `Project` logic
         $project->users()->attach($candidate->user_id, ['role' => 'freelancer']);

         // Update Interview Status if exists
         Interview::where('job_id', $jobId)
             ->where('candidate_id', $validated['candidate_id'])
             ->update(['status' => 'hired']);

         return response()->json($project, 201);
    }
}
