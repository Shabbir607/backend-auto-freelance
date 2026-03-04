<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::withCount('reviews')->orderBy('created_at', 'desc')->paginate(15);
        return CourseResource::collection($courses);
    }

    public function store(CourseRequest $request)
    {
        $course = Course::create($request->validated());
        return new CourseResource($course);
    }

    public function show(Course $course)
    {
        return new CourseResource($course->load('modules.lessons'));
    }

    public function update(CourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return new CourseResource($course);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }

    public function togglePublish(Course $course)
    {
        $course->update(['is_published' => !$course->is_published]);
        return new CourseResource($course);
    }
}
