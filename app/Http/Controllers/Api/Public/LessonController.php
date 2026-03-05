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
            ->with(['resources', 'module.course', 'userProgress'])
            ->firstOrFail();

        // All lessons are now accessible without authentication as requested.
        // Progress is tracked by IP address.


        return new LessonResource($lesson);
    }
}
