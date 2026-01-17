<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Laravel\Passport\Passport;
use Tests\TestCase;

class BlogSystemTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Setup Admin
        if (!Role::where('name', 'admin')->where('guard_name', 'api')->exists()) {
             Role::create(['name' => 'admin', 'guard_name' => 'api']);
        }
        if (!Role::where('name', 'admin')->where('guard_name', 'web')->exists()) {
             Role::create(['name' => 'admin', 'guard_name' => 'web']);
        }
    }

    public function test_admin_can_manage_categories()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        Passport::actingAs($admin);

        // CREATE
        $response = $this->postJson('/api/admin/blog-categories', [
            'title' => 'Tech News',
            'description' => 'Latest in tech',
            'meta_title' => 'Technology News',
            'meta_description' => 'Best tech news',
            'meta_keywords' => 'tech, news, ai',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('blog_categories', ['slug' => 'tech-news', 'meta_title' => 'Technology News']);

        $category = BlogCategory::first();

        // UPDATE
        $response = $this->putJson("/api/admin/blog-categories/{$category->id}", [
            'title' => 'Tech Updates'
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('blog_categories', ['title' => 'Tech Updates', 'slug' => 'tech-updates']);
    }

    public function test_admin_can_manage_blogs()
    {
        Storage::fake('public');
        
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        Passport::actingAs($admin);

        $category = BlogCategory::create(['title' => 'DevOps', 'slug' => 'devops']);

        // CREATE
        $file = UploadedFile::fake()->image('post.jpg');
        
        $response = $this->postJson('/api/admin/blogs', [
            'category_id' => $category->id,
            'title' => 'Intro to Docker',
            'description' => 'Docker basics',
            'content' => '<h1>Docker is cool</h1>',
            'image' => $file,
            'status' => 'published',
            'meta_title' => 'Docker Guide',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('blogs', ['slug' => 'intro-to-docker', 'status' => 'published']);
        
        $blog = Blog::first();
        $this->assertNotNull($blog->published_at);
        Storage::disk('public')->assertExists($blog->image);

        // UPDATE
        $response = $this->putJson("/api/admin/blogs/{$blog->id}", [
            'title' => 'Intro to Docker Updated',
            'status' => 'draft'
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('blogs', ['title' => 'Intro to Docker Updated', 'status' => 'draft']);
    }

    public function test_public_can_view_published_blogs()
    {
        $category = BlogCategory::create(['title' => 'AI', 'slug' => 'ai']);
        
        $published = Blog::create([
            'category_id' => $category->id,
            'title' => 'Future of AI',
            'slug' => 'future-of-ai',
            'description' => 'AI predictions',
            'content' => 'AI content',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $draft = Blog::create([
            'category_id' => $category->id,
            'title' => 'Secret AI',
            'slug' => 'secret-ai',
            'description' => 'Secret',
            'content' => 'Secret content',
            'status' => 'draft',
        ]);

        // LIST
        $response = $this->getJson('/api/blogs');
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data.data')
            ->assertJsonFragment(['slug' => 'future-of-ai'])
            ->assertJsonMissing(['slug' => 'secret-ai']);

        // SHOW
        $response = $this->getJson('/api/blogs/future-of-ai');
        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Future of AI']);
            
        $this->assertEquals(1, $published->fresh()->views);
    }
    
    public function test_public_can_filter_blogs_by_category()
    {
        $cat1 = BlogCategory::create(['title' => 'Cat1', 'slug' => 'cat1']);
        $cat2 = BlogCategory::create(['title' => 'Cat2', 'slug' => 'cat2']);
        
        Blog::create(['category_id' => $cat1->id, 'title' => 'B1', 'slug' => 'b1', 'status' => 'published', 'published_at' => now()]);
        Blog::create(['category_id' => $cat2->id, 'title' => 'B2', 'slug' => 'b2', 'status' => 'published', 'published_at' => now()]);

        $response = $this->getJson('/api/blogs?category=cat1');
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data.data')
            ->assertJsonFragment(['slug' => 'b1'])
            ->assertJsonMissing(['slug' => 'b2']);
    }
}
