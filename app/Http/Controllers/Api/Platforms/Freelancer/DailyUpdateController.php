<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DailyUpdateController extends Controller
{
    public function store(Request $request, $project)
    {
        return response()->json(['message' => 'Store daily update endpoint']);
    }
}
