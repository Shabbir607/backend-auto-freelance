<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourseApiTest extends TestCase
{
    use RefreshDatabase;

    private $admin;

    protected function setUp(): void
    {
        parent::setUp();
        // create admin user
        $this->admin = User::factory()->create();
    }

    public function test_admin_can_create_a_course()
    {
        $payload = [
            'title' => 'Learn Laravel',
            'slug' => 'learn-laravel',
            'description' => 'A comprehensive guide to Laravel.',
            'level' => 'Beginner',
            'is_published' => false,
            'seo_title' => 'Laravel Guide',
        ];

        $response = $this->actingAs($this->admin, 'api')->postJson('/api/admin/courses', $payload);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'Learn Laravel')
                 ->assertJsonPath('data.slug', 'learn-laravel')
                 ->assertJsonPath('data.seo.title', 'Laravel Guide');

        $this->assertDatabaseHas('courses', [
            'slug' => 'learn-laravel',
            'seo_title' => 'Laravel Guide'
        ]);
    }

    public function test_admin_can_manage_full_seo_payload()
    {
        $payload = [
            'title' => 'SEO Course',
            'slug' => 'seo-course',
            'seo_title' => 'Title',
            'seo_description' => 'Desc',
            'seo_keywords' => 'Keys',
            'seo_meta_tags' => '<meta name="test">',
            'og_image' => 'http://example.com/og.jpg',
            'seo_canonical_url' => 'http://example.com/canonical',
        ];

        $response = $this->actingAs($this->admin, 'api')->postJson('/api/admin/courses', $payload);

        $response->assertStatus(201)
                 ->assertJsonPath('data.seo.og_image', 'http://example.com/og.jpg')
                 ->assertJsonPath('data.seo.canonical_url', 'http://example.com/canonical')
                 ->assertJsonPath('data.seo.meta_tags', '<meta name="test">');
    }

    public function test_public_user_cannot_create_course()
    {
        $payload = ['title' => 'test', 'slug' => 'test'];
        $response = $this->postJson('/api/admin/courses', $payload);
        $response->assertStatus(401);
    }

    public function test_admin_can_update_course()
    {
        $course = Course::create([
            'title' => 'Old Title',
            'slug' => 'old-title',
            'is_published' => false
        ]);

        $payload = [
            'title' => 'New Title',
            'slug' => $course->slug,
            'description' => 'Updated desc',
        ];

        $response = $this->actingAs($this->admin, 'api')->putJson("/api/admin/courses/{$course->id}", $payload);

        $response->assertStatus(200)
                 ->assertJsonPath('data.title', 'New Title');

        $this->assertDatabaseHas('courses', ['title' => 'New Title']);
    }

    public function test_admin_can_delete_course()
    {
        $course = Course::create([
            'title' => 'To Delete',
            'slug' => 'to-delete',
            'is_published' => false
        ]);

        $response = $this->actingAs($this->admin, 'api')->deleteJson("/api/admin/courses/{$course->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted('courses', ['id' => $course->id]);
    }

    public function test_admin_can_publish_course()
    {
        $course = Course::create([
            'title' => 'To Publish',
            'slug' => 'to-publish',
            'is_published' => false
        ]);

        $response = $this->actingAs($this->admin, 'api')->patchJson("/api/admin/courses/{$course->id}/publish");

        $response->assertStatus(200)
                 ->assertJsonPath('data.is_published', true);

        $this->assertDatabaseHas('courses', ['id' => $course->id, 'is_published' => 1]); // In test db 1 for true
    }

    public function test_public_user_can_view_published_courses()
    {
        Course::create(['title' => 'Pub 1', 'slug' => 'pub-1', 'is_published' => true]);
        Course::create(['title' => 'Priv 1', 'slug' => 'priv-1', 'is_published' => false]);

        $response = $this->getJson('/api/courses');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonPath('data.0.title', 'Pub 1');
    }

    public function test_public_user_can_view_course_by_slug()
    {
        $course = Course::create(['title' => 'Pub 2', 'slug' => 'pub-2', 'is_published' => true]);

        $response = $this->getJson("/api/courses/{$course->slug}");

        $response->assertStatus(200)
                 ->assertJsonPath('data.id', $course->id);
    }
}
