<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Milestone;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MilestoneController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'projects' => 'required|array',
            'projects.*' => 'exists:projects,id',
        ]);

        $milestones = Milestone::whereIn('project_id', $request->projects)->get();

        return response()->json([
            'status' => 'success',
            'result' => [
                'milestones' => $milestones
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'bidder_id' => 'required|exists:users,id',
            'amount' => 'required|numeric',
            'reason' => 'required|string',
        ]);

        $milestone = Milestone::create($request->all());

        return response()->json([
            'status' => 'success',
            'result' => $milestone
        ]);
    }
}
