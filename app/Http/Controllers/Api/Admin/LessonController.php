<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LessonRequest;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    private function ensureLessonDirectory($subDir): void
    {
        $directory = storage_path('app/public/lessons/' . $subDir);
        if (!\Illuminate\Support\Facades\File::exists($directory)) {
            \Illuminate\Support\Facades\File::makeDirectory($directory, 0755, true);
        }
    }

    public function store(LessonRequest $request)
    {
        $validated = $request->validated();
        $data = $request->all();

        if ($request->hasFile('thumbnail')) {
            $this->ensureLessonDirectory('thumbnails');
            $file = $request->file('thumbnail');
            $fileName = \Illuminate\Support\Str::slug($request->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('lessons/thumbnails', $fileName, 'public');
            $data['thumbnail'] = 'https://api.edgelancer.com/storage/' . $path;
        }

        if ($request->hasFile('video')) {
            $this->ensureLessonDirectory('videos');
            $file = $request->file('video');
            $fileName = \Illuminate\Support\Str::slug($request->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('lessons/videos', $fileName, 'public');
            $data['video_url'] = 'https://api.edgelancer.com/storage/' . $path;
        } elseif ($request->filled('video_url')) {
            $data['video_url'] = $request->video_url;
        }

        // Filter out file objects to avoid SQL errors
        $data = array_filter($data, fn($value) => !($value instanceof \Illuminate\Http\UploadedFile));

        $lesson = Lesson::create($data);
        return new LessonResource($lesson);
    }

    public function update(LessonRequest $request, Lesson $lesson)
    {
        $validated = $request->validated();
        $data = $request->all();

        if ($request->hasFile('thumbnail')) {
            $this->ensureLessonDirectory('thumbnails');
            
            if ($lesson->thumbnail && strpos($lesson->thumbnail, 'api.edgelancer.com/storage/lessons/thumbnails') !== false) {
                $oldPath = str_replace('https://api.edgelancer.com/storage/', '', $lesson->thumbnail);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('thumbnail');
            $fileName = \Illuminate\Support\Str::slug($request->title ?? $lesson->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('lessons/thumbnails', $fileName, 'public');
            $data['thumbnail'] = 'https://api.edgelancer.com/storage/' . $path;
        }

        if ($request->hasFile('video')) {
            $this->ensureLessonDirectory('videos');
            
            if ($lesson->video_url && strpos($lesson->video_url, 'api.edgelancer.com/storage/lessons/videos') !== false) {
                $oldPath = str_replace('https://api.edgelancer.com/storage/', '', $lesson->video_url);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file('video');
            $fileName = \Illuminate\Support\Str::slug($request->title ?? $lesson->title) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('lessons/videos', $fileName, 'public');
            $data['video_url'] = 'https://api.edgelancer.com/storage/' . $path;
        } elseif ($request->filled('video_url')) {
            $data['video_url'] = $request->video_url;
        }

        // Filter out file objects to avoid SQL errors
        $data = array_filter($data, fn($value) => !($value instanceof \Illuminate\Http\UploadedFile));

        $lesson->update($data);
        return new LessonResource($lesson);
    }

    public function destroy(Lesson $lesson)
    {
        // Cleanup files
        if ($lesson->thumbnail && strpos($lesson->thumbnail, 'api.edgelancer.com/storage/lessons/thumbnails') !== false) {
            $oldPath = str_replace('https://api.edgelancer.com/storage/', '', $lesson->thumbnail);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
        }

        if ($lesson->video_url && strpos($lesson->video_url, 'api.edgelancer.com/storage/lessons/videos') !== false) {
            $oldPath = str_replace('https://api.edgelancer.com/storage/', '', $lesson->video_url);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
        }

        $lesson->delete();
        return response()->json(['message' => 'Lesson deleted successfully']);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'lessons' => 'required|array',
            'lessons.*.id' => 'required|exists:lessons,id',
            'lessons.*.order' => 'required|integer'
        ]);

        foreach ($request->lessons as $lessonData) {
            Lesson::where('id', $lessonData['id'])->update(['order' => $lessonData['order']]);
        }

        return response()->json(['message' => 'Lessons reordered successfully']);
    }
}
