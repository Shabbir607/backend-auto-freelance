<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\CourseReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewApiTest extends TestCase
{
    use RefreshDatabase;

    private $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    public function test_guest_can_submit_review()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);

        $payload = [
            'rating' => 5,
            'title' => 'Great!',
            'comment' => 'Very informative.',
            'name' => 'Guest User',
            'email' => 'guest@example.com'
        ];

        $response = $this->postJson("/api/courses/{$course->id}/reviews", $payload);

        $response->assertStatus(201)
                 ->assertJsonPath('data.guest_email', 'guest@example.com');

        $this->assertDatabaseHas('course_reviews', ['guest_email' => 'guest@example.com', 'rating' => 5, 'is_approved' => 0]);
    }

    public function test_admin_can_approve_review()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $review = CourseReview::create([
            'course_id' => $course->id,
            'rating' => 4,
            'guest_name' => 'Guest User',
            'guest_email' => 'guest@example.com',
            'is_approved' => false
        ]);

        $response = $this->actingAs($this->admin, 'api')->patchJson("/api/admin/reviews/{$review->id}/approve");

        $response->assertStatus(200);

        $this->assertDatabaseHas('course_reviews', ['id' => $review->id, 'is_approved' => 1]);
    }

    public function test_admin_can_reject_review()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $review = CourseReview::create([
            'course_id' => $course->id,
            'rating' => 4,
            'guest_name' => 'Guest User',
            'guest_email' => 'guest@example.com',
            'is_approved' => true
        ]);

        $response = $this->actingAs($this->admin, 'api')->patchJson("/api/admin/reviews/{$review->id}/reject");

        $response->assertStatus(200);

        $this->assertDatabaseHas('course_reviews', ['id' => $review->id, 'is_approved' => 0]);
    }
}
