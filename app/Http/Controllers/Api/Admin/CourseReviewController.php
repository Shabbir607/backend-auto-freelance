<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseReview;
use Illuminate\Http\Request;

class CourseReviewController extends Controller
{
    public function index()
    {
        $reviews = CourseReview::with(['course', 'user'])->orderBy('created_at', 'desc')->paginate(20);
        return response()->json($reviews);
    }

    public function approve(CourseReview $review)
    {
        $review->update(['is_approved' => true]);
        return response()->json(['message' => 'Review approved successfully', 'review' => $review]);
    }

    public function reject(CourseReview $review)
    {
        $review->update(['is_approved' => false]);
        return response()->json(['message' => 'Review rejected successfully', 'review' => $review]);
    }

    public function destroy(CourseReview $review)
    {
        $review->delete();
        return response()->json(['message' => 'Review deleted successfully']);
    }
}
