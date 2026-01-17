<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Laravel\Passport\Passport;

class WorkflowFileUploadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        
        // Create role if it doesn't exist (RefreshDatabase means it won't)
        \Spatie\Permission\Models\Role::create(['name' => 'admin', 'guard_name' => 'api']);
    }

    public function test_can_upload_workflow_with_json_file()
    {
        // 1. Setup User and Category
        $user = User::factory()->create();
        $user->assignRole('admin');
        Passport::actingAs($user);

        $category = WorkflowCategory::create([
            'title' => 'Test Category ' . uniqid(), 
            'slug' => 'test-category-' . uniqid()
        ]);

        // 2. Create JSON file
        $jsonContent = ['steps' => ['trigger', 'action'], 'meta' => 'test'];
        $file = UploadedFile::fake()->createWithContent('workflow.json', json_encode($jsonContent));

        // 3. Make Request
        $response = $this->postJson('/api/workflows', [
            'title' => 'Test Workflow ' . uniqid(),
            'category_id' => $category->id,
            'description' => 'Test Description',
            'difficulty' => 'beginner',
            'time_saved_value' => 10,
            'time_saved_unit' => 'hours',
            'status' => 'draft',
            'json_file' => $file
        ]);

        // 4. Assertions
        $response->assertStatus(201);
        
        $workflowId = $response->json('data.id');
        $workflow = Workflow::find($workflowId);
        
        $this->assertNotNull($workflow->json_file_path);
        $this->assertEquals('workflow.json', $workflow->json_file_name);
        $this->assertEquals($jsonContent, $workflow->json_data);
        
        Storage::disk('public')->assertExists($workflow->json_file_path);
    }

    public function test_validates_json_file_type()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');
        Passport::actingAs($user);
        
        $category = WorkflowCategory::create([
            'title' => 'Test Cat ' . uniqid(), 
            'slug' => 'test-cat-' . uniqid()
        ]);

        $file = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->postJson('/api/workflows', [
            'title' => 'Invalid File Workflow',
            'category_id' => $category->id,
            'description' => 'Test',
            'difficulty' => 'beginner',
            'time_saved_value' => 10,
            'time_saved_unit' => 'hours',
            'status' => 'draft',
            'json_file' => $file
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['json_file']);
    }

    public function test_can_download_file()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');
        Passport::actingAs($user);
        
        // Create workflow manually with file
        Storage::fake('public');
        $filename = 'test_download.json';
        $path = 'workflows/' . $filename;
        $content = json_encode(['foo' => 'bar']);
        
        Storage::disk('public')->put($path, $content);

        $category = WorkflowCategory::create([
            'title' => 'Download Cat ' . uniqid(), 
            'slug' => 'download-cat-' . uniqid()
        ]);
        
        $workflow = Workflow::create([
            'title' => 'Download Test',
            'slug' => 'download-test',
            'category_id' => $category->id,
            'description' => 'desc',
            'difficulty' => 'beginner',
            'time_saved_value' => 1,
            'time_saved_unit' => 'hours',
            'status' => 'draft',
            'json_file_name' => $filename,
            'json_file_path' => $path,
            'json_data' => ['foo' => 'bar']
        ]);

        $response = $this->get("/api/workflows/{$workflow->id}/download");
        
        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/json');
    }
}
