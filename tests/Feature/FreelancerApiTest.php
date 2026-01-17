<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Platform;
use App\Models\PlatformAccount;
use App\Services\Freelancer\FreelancerService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;

class FreelancerApiTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $platform;
    protected $account;
    protected $freelancerServiceMock;

    protected function setUp(): void
    {
        parent::setUp();

        // Create User
        $this->user = User::factory()->create();
        
        // Create Platform
        $this->platform = Platform::create([
            'name' => 'Freelancer',
            'slug' => 'freelancer',
            'url' => 'https://www.freelancer.com',
            'status' => 'active'
        ]);

        // Create Role and Assign
        $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'freelancer', 'guard_name' => 'api']);
        $this->user->assignRole($role);

        // Create Account
        $this->account = PlatformAccount::create([
            'user_id' => $this->user->id,
            'platform_id' => $this->platform->id,
            'uuid' => 'test-uuid',
            'account_username' => 'testuser',
            'email' => 'test@example.com',
            'status' => 'active',
            'external_account_id' => 12345,
            'access_token' => 'fake-token'
        ]);

        // Mock FreelancerService
        $this->freelancerServiceMock = Mockery::mock(FreelancerService::class);
        $this->app->instance(FreelancerService::class, $this->freelancerServiceMock);
        
        $this->withoutMiddleware();
    }

    public function test_create_contest()
    {
        $payload = [
            'title' => 'Test Contest',
            'description' => 'Description',
            'currency' => ['id' => 1],
            'budget' => ['min' => 10, 'max' => 20],
            'jobs' => [1],
            'duration' => 3
        ];

        $this->freelancerServiceMock
            ->shouldReceive('post')
            ->once()
            ->andReturn(['status' => 'success', 'result' => ['id' => 101]]);

        $response = $this->actingAs($this->user, 'api')
            ->postJson("/api/freelancer/freelancer/{$this->account->uuid}/contests", $payload);

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);
    }

    public function test_get_upgrade_fees()
    {
        $this->freelancerServiceMock
            ->shouldReceive('get')
            ->once()
            ->andReturn(['fees' => []]);

        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/freelancer/freelancer/{$this->account->uuid}/projects/fees");

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    public function test_get_timezones()
    {
        $this->freelancerServiceMock
            ->shouldReceive('get')
            ->once()
            ->andReturn(['timezones' => []]);

        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/freelancer/freelancer/{$this->account->uuid}/timezones");

        $response->assertStatus(200)
            ->assertJson(['timezones' => []]);
    }
}
