<?php

namespace App\Http\Controllers\Api\Recruitment;

use App\Http\Controllers\Controller;
use App\Models\Interview;
use App\Models\JobPost;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CandidateController extends Controller
{
    /**
     * Apply for a Job
     */
    public function applyJob(Request $request, $jobId)
    {
        $candidate = Candidate::where('user_id', Auth::id())->firstOrFail();
        $job = JobPost::findOrFail($jobId);

        if ($job->appliedJobs()->where('candidate_id', $candidate->id)->exists()) {
            return response()->json(['message' => 'Already applied'], 409);
        }

        $job->appliedJobs()->attach($candidate->id);

        return response()->json(['message' => 'Application successful'], 201);
    }

    /**
     * View My Scheduled Interviews
     */
    public function myInterviews()
    {
        $candidate = Candidate::where('user_id', Auth::id())->firstOrFail();

        $interviews = Interview::where('candidate_id', $candidate->id)
            ->with(['job', 'interviewer'])
            ->orderBy('scheduled_at', 'desc')
            ->get();

        return response()->json($interviews);
    }
}
