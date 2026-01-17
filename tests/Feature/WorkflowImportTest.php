<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class WorkflowImportTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create role if not exists for API
        if (!\Spatie\Permission\Models\Role::where('name', 'admin')->where('guard_name', 'api')->exists()) {
             \Spatie\Permission\Models\Role::create(['name' => 'admin', 'guard_name' => 'api']);
        }
        
        // Create role for WEB guard (required for assignRole on User model which likely defaults to web)
        if (!\Spatie\Permission\Models\Role::where('name', 'admin')->where('guard_name', 'web')->exists()) {
             \Spatie\Permission\Models\Role::create(['name' => 'admin', 'guard_name' => 'web']);
        }
        
        // Create an admin user 
        $user = User::factory()->create();
        $user->assignRole('admin');
        
        \Laravel\Passport\Passport::actingAs($user);
    }

    public function test_can_import_workflow_with_external_id_and_metrics()
    {
        $jsonContent = '{
          "workflow": {
            "id": "823lWldG0eG7Wp63",
            "name": "Test Workflow Import",
            "views": 100,
            "recentViews": 10,
            "totalViews": 200,
            "description": "Test Description",
            "categories": [
                {"id": "cat1", "name": "Content Creation"},
                {"id": "cat2", "name": "Marketing"}
            ],
            "workflow": {
                "nodes": [],
                "connections": {}
            }
          }
        }';

        $file = UploadedFile::fake()->createWithContent('workflow.json', $jsonContent);

        $category = WorkflowCategory::create(['title' => 'General', 'slug' => 'general', 'is_active' => true]);

        $response = $this->postJson('/api/workflows', [
            'title' => 'Manual Title Override',
            'description' => 'Manual Description Override',
            'status' => 'published',
            'difficulty' => 'beginner',
            'price' => 0,
            'time_saved_value' => 10,
            'time_saved_unit' => 'minutes',
            'category_id' => $category->id,
            'json_file' => $file
        ]);

        $response->assertStatus(201);
        
        $workflow = Workflow::where('external_id', '823lWldG0eG7Wp63')->first();
        $this->assertNotNull($workflow);
        $this->assertEquals(100, $workflow->views);
        $this->assertEquals(10, $workflow->recent_views);
        $this->assertEquals(200, $workflow->total_views);
        
        $this->assertTrue(WorkflowCategory::where('title', 'Content Creation')->exists());
        $this->assertTrue(WorkflowCategory::where('title', 'Marketing')->exists());
        
        $this->assertEquals(2, $workflow->categories()->count());
    }

    public function test_search_workflows()
    {
        $w1 = Workflow::create([
            'title' => 'Alpha Workflow', 
            'slug' => 'alpha-workflow',
            'description' => 'Description one',
            'status' => 'published',
            'difficulty' => 'beginner',
             'category_id' => WorkflowCategory::create(['title' => 'Cat A', 'slug' => 'cat-a'])->id,
             'time_saved_value' => 1,
             'time_saved_unit' => 'hours',
        ]);
        
        $w2 = Workflow::create([
            'title' => 'Beta Automation', 
            'slug' => 'beta-automation',
            'description' => 'Description two',
            'status' => 'published',
            'difficulty' => 'advanced',
             'category_id' => WorkflowCategory::create(['title' => 'Cat B', 'slug' => 'cat-b'])->id,
             'time_saved_value' => 1,
             'time_saved_unit' => 'hours',
        ]);

        $response = $this->getJson('/api/workflows?search=Alpha');
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data.data');
        $response->assertJsonFragment(['title' => 'Alpha Workflow']);
    }

    public function test_filter_by_category()
    {
        $cat1 = WorkflowCategory::create(['title' => 'Cat One', 'slug' => 'cat-one']);
        $cat2 = WorkflowCategory::create(['title' => 'Cat Two', 'slug' => 'cat-two']);

        $w1 = Workflow::create([
            'title' => 'Cat One Workflow',
            'slug' => 'cat-one-wf',
            'status' => 'published',
            'difficulty' => 'beginner',
             'category_id' => $cat1->id,
             'time_saved_value' => 1,
             'time_saved_unit' => 'hours',
        ]);
        $w1->categories()->attach($cat1->id);

        $w2 = Workflow::create([
            'title' => 'Cat Two Workflow',
            'slug' => 'cat-two-wf',
            'status' => 'published',
            'difficulty' => 'beginner',
             'category_id' => $cat2->id,
             'time_saved_value' => 1,
             'time_saved_unit' => 'hours',
        ]);
        $w2->categories()->attach($cat2->id);

        $response = $this->getJson("/api/workflows?category_id={$cat1->id}");
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data.data');
        $response->assertJsonFragment(['title' => 'Cat One Workflow']);
    }
}
