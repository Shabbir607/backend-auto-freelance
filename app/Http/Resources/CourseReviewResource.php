<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'course_id' => $this->course_id,
            'user_id' => $this->user_id,
            'rating' => $this->rating,
            'title' => $this->title,
            'comment' => $this->comment,
            'is_approved' => $this->is_approved,
            'user' => $this->user_id ? [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ] : [
                'id' => null,
                'name' => $this->guest_name,
            ],
            'guest_email' => $this->guest_email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
