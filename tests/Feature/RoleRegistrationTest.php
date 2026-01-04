<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\JobPosting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleRegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
        \Illuminate\Support\Facades\Artisan::call('passport:client', [
            '--personal' => true, 
            '--name' => 'Personal Access Client',
            '--no-interaction' => true
        ]);
    }

    public function test_can_register_as_freelancer()
    {
        $email = 'freelancer_' . time() . '@test.com';
        $response = $this->postJson('/api/register', [
            'name' => 'Test Freelancer',
            'email' => $email,
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'freelancer'
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => $email]);
        
        $user = User::where('email', $email)->first();
        $this->assertTrue($user->hasRole('freelancer'));
        $this->assertTrue($user->can('view projects'));
    }

    public function test_can_register_as_recruiter()
    {
        $email = 'recruiter_' . time() . '@test.com';
        $response = $this->postJson('/api/register', [
            'name' => 'Test Recruiter',
            'email' => $email,
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'recruiter'
        ]);

        $response->assertStatus(201);
        $user = User::where('email', $email)->first();
        $this->assertTrue($user->hasRole('recruiter'));
        $this->assertTrue($user->can('manage projects'));
    }

    public function test_recruiter_can_create_job_posting()
    {
        $recruiter = User::factory()->create();
        $recruiter->assignRole('recruiter');

        $this->actingAs($recruiter, 'api');

        $jobData = [
            'title' => 'Test Job',
            'description' => 'This is a test job description',
            'budget' => 1000,
            'skills_required' => ['PHP', 'Laravel'],
            'user_id' => $recruiter->id
        ];

        // Direct model creation for now as we haven't implemented the JobController yet
        // In a real scenario, we would test the API endpoint
        $job = JobPosting::create($jobData);

        $this->assertDatabaseHas('job_postings', ['title' => 'Test Job']);
        $this->assertEquals($recruiter->id, $job->user_id);
    }
}
