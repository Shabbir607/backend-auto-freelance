<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\UserLessonProgress;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProgressApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_update_lesson_progress_by_ip()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $module = Module::create(['course_id' => $course->id, 'title' => 'Module 1', 'order' => 1]);
        $lesson = Lesson::create([
            'module_id' => $module->id,
            'title' => 'Lesson 1',
            'slug' => 'lesson-1',
            'order' => 1
        ]);

        $payload = [
            'watched_percentage' => 50
        ];

        // Track progress from a specific IP
        $response = $this->withServerVariables(['REMOTE_ADDR' => '1.2.3.4'])
                         ->postJson("/api/lessons/{$lesson->id}/progress", $payload);

        $response->assertStatus(200)
                 ->assertJsonPath('progress.watched_percentage', 50)
                 ->assertJsonPath('progress.ip_address', '1.2.3.4');

        $this->assertDatabaseHas('user_lesson_progress', [
            'lesson_id' => $lesson->id,
            'ip_address' => '1.2.3.4',
            'watched_percentage' => 50
        ]);
    }

    public function test_progress_marks_as_completed_at_90_percent()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $module = Module::create(['course_id' => $course->id, 'title' => 'Module 1', 'order' => 1]);
        $lesson = Lesson::create([
            'module_id' => $module->id,
            'title' => 'Lesson 1',
            'slug' => 'lesson-1',
            'order' => 1
        ]);

        $payload = [
            'watched_percentage' => 95
        ];

        $response = $this->withServerVariables(['REMOTE_ADDR' => '1.2.3.4'])
                         ->postJson("/api/lessons/{$lesson->id}/progress", $payload);

        $response->assertStatus(200);
        
        $progress = UserLessonProgress::first();
        $this->assertNotNull($progress->completed_at);
        $this->assertEquals(95, $progress->watched_percentage);
    }
}
