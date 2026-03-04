<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function show($slug)
    {
        $lesson = Lesson::where('slug', $slug)
            ->with('resources')
            ->firstOrFail();

        // Check if user has access. 
        // Logic: 
        // 1. Is it a free preview? Allow.
        // 2. Is it not free preview? Require auth and (optionally) check enrollment
        
        if (!$lesson->is_free_preview) {
            $user = auth('api')->user();
            if (!$user) {
                return response()->json(['message' => 'Unauthorized. This lesson requires authentication.'], 403);
            }
            // Future logic: Check if user is enrolled in the course
            // $courseId = $lesson->module->course_id;
            // if (!$user->isEnrolledIn($courseId)) { abort(403); }
        }

        return new LessonResource($lesson);
    }
}
