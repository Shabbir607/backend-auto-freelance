<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Progress\UpdateLessonProgressRequest;
use App\Models\Lesson;
use App\Models\UserLessonProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class UserProgressController extends Controller
{
    public function updateProgress(UpdateLessonProgressRequest $request, $lessonId)
    {
        $lesson = Lesson::findOrFail($lessonId);
        $ipAddress = $request->ip();

        $percentage = $request->watched_percentage;
        $completedAt = $percentage >= 90 ? Carbon::now() : null;

        $progress = UserLessonProgress::updateOrCreate(
            ['ip_address' => $ipAddress, 'lesson_id' => $lesson->id],
            [
                'watched_percentage' => $percentage,
            ]
        );

        // Only set completed_at if it's not already completed and we crossed the 90% threshold
        if ($percentage >= 90 && !$progress->completed_at) {
            $progress->completed_at = $completedAt;
            $progress->save();
        }

        return response()->json([
            'message' => 'Progress updated',
            'progress' => $progress
        ]);
    }
}
