<?php

namespace App\Policies;

use App\Models\CourseReview;
use App\Models\User;

class CourseReviewPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CourseReview $courseReview): bool
    {
        return $user->id === $courseReview->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CourseReview $courseReview): bool
    {
        return $user->id === $courseReview->user_id;
    }
}
