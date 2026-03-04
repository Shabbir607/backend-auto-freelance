<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LessonApiTest extends TestCase
{
    use RefreshDatabase;

    private $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    public function test_admin_can_create_lesson()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $module = Module::create(['course_id' => $course->id, 'title' => 'Module 1', 'order' => 1]);

        $payload = [
            'module_id' => $module->id,
            'title' => 'Lesson 1',
            'slug' => 'lesson-1',
            'video_url' => 'http://example.com/video',
            'text_content' => 'Content',
            'is_free_preview' => true,
            'order' => 1
        ];

        $response = $this->actingAs($this->admin, 'api')->postJson('/api/admin/lessons', $payload);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'Lesson 1');

        $this->assertDatabaseHas('lessons', ['slug' => 'lesson-1', 'module_id' => $module->id]);
    }

    public function test_admin_can_manage_lesson_seo()
    {
        $course = Course::create(['title' => 'Test', 'slug' => 'test']);
        $module = Module::create(['course_id' => $course->id, 'title' => 'M1']);

        $payload = [
            'module_id' => $module->id,
            'title' => 'SEO Lesson',
            'slug' => 'seo-lesson',
            'seo_title' => 'Lesson SEO Title',
            'seo_canonical_url' => 'http://example.com/lesson-canonical',
        ];

        $response = $this->actingAs($this->admin, 'api')->postJson('/api/admin/lessons', $payload);

        $response->assertStatus(201)
                 ->assertJsonPath('data.seo.title', 'Lesson SEO Title')
                 ->assertJsonPath('data.seo.canonical_url', 'http://example.com/lesson-canonical');
    }

    public function test_admin_can_update_lesson()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $module = Module::create(['course_id' => $course->id, 'title' => 'Module 1', 'order' => 1]);
        $lesson = Lesson::create([
            'module_id' => $module->id,
            'title' => 'Old Title',
            'slug' => 'old-title',
            'order' => 1
        ]);

        $payload = [
            'module_id' => $module->id,
            'title' => 'Updated Title',
            'slug' => 'updated-title',
            'order' => 1
        ];

        $response = $this->actingAs($this->admin, 'api')->putJson("/api/admin/lessons/{$lesson->id}", $payload);

        $response->assertStatus(200)
                 ->assertJsonPath('data.title', 'Updated Title');
    }

    public function test_public_user_can_view_lesson()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course', 'is_published' => true]);
        $module = Module::create(['course_id' => $course->id, 'title' => 'Module 1', 'order' => 1]);
        $lesson = Lesson::create([
            'module_id' => $module->id,
            'title' => 'Public Lesson',
            'slug' => 'public-lesson',
            'order' => 1,
            'is_free_preview' => true
        ]);

        // assuming lesson is available publicly based on course logic
        $response = $this->getJson("/api/lessons/{$lesson->slug}");

        $response->assertStatus(200)
                 ->assertJsonPath('data.title', 'Public Lesson');
    }
}
