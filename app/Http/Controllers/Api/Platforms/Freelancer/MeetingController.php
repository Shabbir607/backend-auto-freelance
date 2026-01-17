<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function index(Request $request, $project)
    {
        return response()->json(['message' => 'List meetings endpoint']);
    }

    public function store(Request $request, $project)
    {
        return response()->json(['message' => 'Store meeting endpoint']);
    }
}
