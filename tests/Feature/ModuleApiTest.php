<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Module;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModuleApiTest extends TestCase
{
    use RefreshDatabase;

    private $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    public function test_admin_can_create_module()
    {
        $course = Course::create([
            'title' => 'Test Course',
            'slug' => 'test-course'
        ]);

        $payload = [
            'course_id' => $course->id,
            'title' => 'Introduction',
            'order' => 1
        ];

        $response = $this->actingAs($this->admin, 'api')->postJson('/api/admin/modules', $payload);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'Introduction');

        $this->assertDatabaseHas('modules', ['title' => 'Introduction', 'course_id' => $course->id]);
    }

    public function test_admin_can_update_module()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $module = Module::create(['course_id' => $course->id, 'title' => 'Old Title', 'order' => 1]);

        $payload = [
            'course_id' => $course->id,
            'title' => 'Updated Title',
            'order' => 2
        ];

        $response = $this->actingAs($this->admin, 'api')->putJson("/api/admin/modules/{$module->id}", $payload);

        $response->assertStatus(200)
                 ->assertJsonPath('data.title', 'Updated Title');

        $this->assertDatabaseHas('modules', ['title' => 'Updated Title', 'order' => 2]);
    }

    public function test_admin_can_delete_module()
    {
        $course = Course::create(['title' => 'Test Course', 'slug' => 'test-course']);
        $module = Module::create(['course_id' => $course->id, 'title' => 'To Delete', 'order' => 1]);

        $response = $this->actingAs($this->admin, 'api')->deleteJson("/api/admin/modules/{$module->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('modules', ['id' => $module->id]);
    }
}
