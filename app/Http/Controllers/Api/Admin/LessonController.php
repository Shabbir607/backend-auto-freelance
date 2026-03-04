<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LessonRequest;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function store(LessonRequest $request)
    {
        $lesson = Lesson::create($request->validated());
        return new LessonResource($lesson);
    }

    public function update(LessonRequest $request, Lesson $lesson)
    {
        $lesson->update($request->validated());
        return new LessonResource($lesson);
    }

    public function destroy(Lesson $lesson)
    {
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
