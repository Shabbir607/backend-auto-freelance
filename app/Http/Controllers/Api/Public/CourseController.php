<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::published()
            ->withCount('approvedReviews as reviews_count')
            ->orderBy('created_at', 'desc')
            ->paginate(12);
            
        return CourseResource::collection($courses);
    }

    public function show($slug)
    {
        $course = Course::published()
            ->where('slug', $slug)
            ->with(['modules.lessons.userProgress'])
            ->withCount('approvedReviews as reviews_count')
            ->firstOrFail();

        return new CourseResource($course);
    }
}
