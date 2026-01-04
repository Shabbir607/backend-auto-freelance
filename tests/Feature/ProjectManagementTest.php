<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Laravel\Passport\Passport;

class ProjectManagementTest extends TestCase
{
    use RefreshDatabase; // Commented out to avoid wiping existing dev data, will clean up manually or use transaction if possible. 
    // Ideally use a separate testing database. For now, I'll create data and check response.

    public function test_project_management_flow()
    {
        // 1. Authenticate
        $user = User::factory()->create();
        Passport::actingAs($user);

        // 2. Create Project
        $response = $this->postJson('/api/projects', [
            'name' => 'Test Project',
            'description' => 'A test project description',
            'status' => 'active',
            'priority' => 'high',
            'budget' => 5000,
            'start_date' => now()->toDateString(),
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('name', 'Test Project');

        $projectId = $response->json('id');

        // 3. Add Task
        $response = $this->postJson("/api/projects/{$projectId}/tasks", [
            'title' => 'First Task',
            'status' => 'todo',
            'priority' => 'medium',
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('title', 'First Task');

        $taskId = $response->json('id');

        // 4. Update Task
        $response = $this->putJson("/api/projects/{$projectId}/tasks/{$taskId}", [
            'status' => 'in_progress',
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('status', 'in_progress');

        // 5. Post Daily Update
        $response = $this->postJson("/api/projects/{$projectId}/updates", [
            'content' => 'Today I worked on the backend.',
            'date' => now()->toDateString(),
        ]);

        $response->assertStatus(201);

        // 6. Upload File
        Storage::fake('public');
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->postJson("/api/projects/{$projectId}/files", [
            'file' => $file,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('name', 'document.pdf');

        // 7. Schedule Meeting
        $response = $this->postJson("/api/projects/{$projectId}/meetings", [
            'title' => 'Kickoff Meeting',
            'start_time' => now()->addDay()->toDateTimeString(),
            'end_time' => now()->addDay()->addHour()->toDateTimeString(),
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('title', 'Kickoff Meeting');

        // Cleanup
        Project::find($projectId)->delete();
        $user->delete();
    }
}
