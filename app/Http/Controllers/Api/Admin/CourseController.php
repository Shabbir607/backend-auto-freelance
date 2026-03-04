<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    private function ensureCourseImageDirectory(): void
    {
        $directory = storage_path('app/public/courses');
        if (!\Illuminate\Support\Facades\File::exists($directory)) {
            \Illuminate\Support\Facades\File::makeDirectory($directory, 0755, true);
        }
    }

    public function index()
    {
        $courses = Course::withCount('reviews')->orderBy('created_at', 'desc')->paginate(15);
        return CourseResource::collection($courses);
    }

    public function store(CourseRequest $request)
    {
        $validated = $request->validated();
        $data = $request->all();

        if ($request->hasFile('og_image')) {
            $this->ensureCourseImageDirectory();
            $file = $request->file('og_image');
            $fileName = \Illuminate\Support\Str::slug($request->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('courses', $fileName, 'public');
            $data['og_image'] = 'https://api.edgelancer.com/storage/' . $path;
        }

        // Filter out file objects to avoid SQL errors
        $data = array_filter($data, fn($value) => !($value instanceof \Illuminate\Http\UploadedFile));

        $course = Course::create($data);
        return new CourseResource($course);
    }

    public function show(Course $course)
    {
        return new CourseResource($course->load('modules.lessons'));
    }

    public function update(CourseRequest $request, Course $course)
    {
        $validated = $request->validated();
        $data = $request->all();

        if ($request->hasFile('og_image')) {
            $this->ensureCourseImageDirectory();
            
            // Delete old image if exists
            if ($course->og_image) {
                $oldPath = str_replace('https://api.edgelancer.com/storage/', '', $course->og_image);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('og_image');
            $fileName = \Illuminate\Support\Str::slug($request->title ?? $course->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('courses', $fileName, 'public');
            $data['og_image'] = 'https://api.edgelancer.com/storage/' . $path;
        }

        // Filter out file objects to avoid SQL errors
        $data = array_filter($data, fn($value) => !($value instanceof \Illuminate\Http\UploadedFile));

        $course->update($data);
        return new CourseResource($course);
    }

    public function destroy(Course $course)
    {
        if ($course->og_image) {
            $oldPath = str_replace('https://api.edgelancer.com/storage/', '', $course->og_image);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
        }
        
        $course->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }

    public function togglePublish(Course $course)
    {
        $course->update(['is_published' => !$course->is_published]);
        return new CourseResource($course);
    }
}
