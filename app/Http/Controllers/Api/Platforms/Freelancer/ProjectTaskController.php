<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProjectTaskController extends Controller
{
    public function store(Request $request, $project)
    {
        return response()->json(['message' => 'Store task endpoint']);
    }

    public function update(Request $request, $project, $task)
    {
        return response()->json(['message' => 'Update task endpoint']);
    }

    public function destroy(Request $request, $project, $task)
    {
        return response()->json(['message' => 'Delete task endpoint']);
    }
}
