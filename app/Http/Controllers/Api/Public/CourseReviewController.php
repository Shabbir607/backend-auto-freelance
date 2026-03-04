<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreCourseReviewRequest;
use App\Http\Requests\Review\UpdateCourseReviewRequest;
use App\Http\Resources\CourseReviewResource;
use App\Models\Course;
use App\Models\CourseReview;
use Illuminate\Http\Request;

class CourseReviewController extends Controller
{
    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);
        
        $reviews = $course->approvedReviews()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($reviews); // Pagination included implicitly
    }

    public function store(StoreCourseReviewRequest $request, $courseId)
    {
        $course = Course::findOrFail($courseId);

        $userId = auth('api')->id();

        // Make sure user hasn't already reviewed
        if ($userId) {
            $existingReview = CourseReview::where('course_id', $courseId)
                ->where('user_id', $userId)
                ->first();

            if ($existingReview) {
                return response()->json(['message' => 'You have already reviewed this course.'], 403);
            }
        } else {
            $existingGuestReview = CourseReview::where('course_id', $courseId)
                ->where('guest_email', $request->email)
                ->first();

            if ($existingGuestReview) {
                return response()->json(['message' => 'A review from this email already exists.'], 403);
            }
        }

        $review = CourseReview::create([
            'course_id' => $course->id,
            'user_id' => $userId,
            'guest_name' => $userId ? null : $request->name,
            'guest_email' => $userId ? null : $request->email,
            'rating' => $request->rating,
            'title' => $request->title,
            'comment' => $request->comment,
            'is_approved' => false, // Approval required
        ]);

        return new CourseReviewResource($review);
    }

    public function update(UpdateCourseReviewRequest $request, CourseReview $review)
    {
        // $this->authorize('update', $review); // We'll manually check for simplicity if policy fails
        if (!$review->user_id || $review->user_id !== auth('api')->id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $review->update(array_merge(
            $request->validated(), 
            ['is_approved' => false] // Require re-approval after edits
        ));

        return new CourseReviewResource($review);
    }

    public function destroy(CourseReview $review)
    {
        if (!$review->user_id || $review->user_id !== auth('api')->id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
