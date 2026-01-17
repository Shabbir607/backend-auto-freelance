<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Platform;
use App\Models\PlatformAccount;
use App\Models\Project;
use App\Models\Milestone;
use App\Models\AccountFilter;
use App\Services\Freelancer\FreelancerJobService;
use App\Services\Freelancer\ThreadService;
use App\Services\Freelancer\MessagingService;
use App\Services\Freelancer\AccountService;
use App\Services\Freelancer\ProjectService;
use App\Services\Freelancer\BidService;
use App\Services\Freelancer\ContestService;
use App\Services\Freelancer\UtilityService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class FreelancerFullApiTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $platform;
    protected $account;
    
    // Mocks
    protected $jobServiceMock;
    protected $threadServiceMock;
    protected $messagingServiceMock;
    protected $accountServiceMock;
    protected $projectServiceMock;
    protected $bidServiceMock;
    protected $contestServiceMock;
    protected $utilityServiceMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(); // Simplify testing by bypassing auth middleware for now

        // Create User & Role
        $this->user = User::factory()->create();
        
        // Create Role and Assign
        $role = Role::firstOrCreate(['name' => 'freelancer', 'guard_name' => 'api']);
        
        // Create Permissions
        Permission::firstOrCreate(['name' => 'post_project', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'bid_on_project', 'guard_name' => 'api']);
        
        $role->givePermissionTo(['post_project', 'bid_on_project']);
        $this->user->assignRole($role);

        // Create Platform
        $this->platform = Platform::create([
            'name' => 'Freelancer',
            'slug' => 'freelancer',
            'url' => 'https://www.freelancer.com',
            'status' => 'active'
        ]);

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

        // Mock Services
        $this->jobServiceMock = Mockery::mock(FreelancerJobService::class);
        $this->app->instance(FreelancerJobService::class, $this->jobServiceMock);

        $this->threadServiceMock = Mockery::mock(ThreadService::class);
        $this->app->instance(ThreadService::class, $this->threadServiceMock);

        $this->messagingServiceMock = Mockery::mock(MessagingService::class);
        $this->app->instance(MessagingService::class, $this->messagingServiceMock);

        $this->accountServiceMock = Mockery::mock(AccountService::class);
        $this->app->instance(AccountService::class, $this->accountServiceMock);

        $this->projectServiceMock = Mockery::mock(ProjectService::class);
        $this->app->instance(ProjectService::class, $this->projectServiceMock);

        $this->bidServiceMock = Mockery::mock(BidService::class);
        $this->app->instance(BidService::class, $this->bidServiceMock);

        $this->contestServiceMock = Mockery::mock(ContestService::class);
        $this->app->instance(ContestService::class, $this->contestServiceMock);

        $this->utilityServiceMock = Mockery::mock(UtilityService::class);
        $this->app->instance(UtilityService::class, $this->utilityServiceMock);
    }

    // --- Job Discovery ---
    public function test_list_jobs()
    {
        $this->jobServiceMock->shouldReceive('listJobs')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson('/api/freelancer/jobs');
        $response->assertStatus(200);
    }

    public function test_search_jobs()
    {
        $this->jobServiceMock->shouldReceive('searchJobs')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson('/api/freelancer/jobs/search?query=php');
        $response->assertStatus(200);
    }

    public function test_job_bundles()
    {
        $this->jobServiceMock->shouldReceive('jobBundles')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson('/api/freelancer/job-bundles');
        $response->assertStatus(200);
    }

    public function test_job_bundle_categories()
    {
        $this->jobServiceMock->shouldReceive('jobBundleCategories')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson('/api/freelancer/job-bundle-categories');
        $response->assertStatus(200);
    }

    // --- Messaging ---
    public function test_list_threads()
    {
        $this->threadServiceMock->shouldReceive('listThreads')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson('/api/freelancer/messaging/threads');
        $response->assertStatus(200);
    }

    public function test_create_thread()
    {
        $this->threadServiceMock->shouldReceive('createThread')->once()->andReturn(['id' => 1]);
        $response = $this->actingAs($this->user, 'api')->postJson('/api/freelancer/messaging/threads', [
            'members' => [1],
            'account_uuid' => $this->account->uuid
        ]);
        $response->assertStatus(200);
    }

    public function test_get_thread()
    {
        $this->threadServiceMock->shouldReceive('getThread')->once()->andReturn(['id' => 1]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/messaging/threads/1?account_uuid={$this->account->uuid}");
        $response->assertStatus(200);
    }

    public function test_send_message()
    {
        $this->threadServiceMock->shouldReceive('sendMessage')->once()->andReturn(['id' => 101]);
        $response = $this->actingAs($this->user, 'api')->postJson('/api/freelancer/messaging/threads/1/messages', [
            'message' => 'test',
            'account_uuid' => $this->account->uuid
        ]);
        $response->assertStatus(200);
    }

    public function test_list_messages()
    {
        $this->messagingServiceMock->shouldReceive('listMessages')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson('/api/freelancer/messaging/threads/1/messages');
        $response->assertStatus(200);
    }

    // --- Account Management ---
    public function test_list_accounts()
    {
        $this->accountServiceMock->shouldReceive('listAccounts')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/accounts");
        $response->assertStatus(200);
    }

    public function test_fetch_profile()
    {
        $this->accountServiceMock->shouldReceive('fetchProfile')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/accounts/profile?uuid={$this->account->uuid}");
        $response->assertStatus(200);
    }

    public function test_search_directory()
    {
        $this->accountServiceMock->shouldReceive('searchDirectory')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/users/directory?query=test");
        $response->assertStatus(200);
    }

    public function test_get_login_devices()
    {
        $this->accountServiceMock->shouldReceive('getLoginDevices')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/users/devices");
        $response->assertStatus(200);
    }

    public function test_add_user_skills()
    {
        $this->accountServiceMock->shouldReceive('addUserSkills')->once()->andReturn(['status' => 'success']);
        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/users/skills", ['jobs' => [1]]);
        $response->assertStatus(200);
    }

    public function test_get_user_reputation()
    {
        $this->accountServiceMock->shouldReceive('getReputations')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/reputations?users[]=123");
        $response->assertStatus(200);
    }

    // --- Project Management ---
    public function test_list_projects()
    {
        $this->projectServiceMock->shouldReceive('listProjects')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/projects");
        $response->assertStatus(200);
    }

    public function test_create_project()
    {
        $this->projectServiceMock->shouldReceive('createProject')->once()->andReturn(['id' => 101]);
        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/projects", ['title' => 'Test']);
        $response->assertStatus(200);
    }

    public function test_get_project()
    {
        $this->projectServiceMock->shouldReceive('getProject')->once()->andReturn(['id' => 101]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/projects/101");
        $response->assertStatus(200);
    }

    public function test_invite_freelancer()
    {
        $this->projectServiceMock->shouldReceive('inviteFreelancer')->once()->andReturn(['status' => 'invited']);
        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/projects/101/invite", ['user_id' => 123]);
        $response->assertStatus(200);
    }

    public function test_get_project_upgrade_fees()
    {
        $this->projectServiceMock->shouldReceive('getUpgradeFees')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/projects/fees");
        $response->assertStatus(200);
    }

    public function test_get_milestones()
    {
        $this->projectServiceMock->shouldReceive('getMilestones')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/projects/101/milestones");
        $response->assertStatus(200);
    }

    public function test_list_all_projects()
    {
        $this->projectServiceMock->shouldReceive('listAllProjects')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/all-projects");
        $response->assertStatus(200);
    }

    // --- Bidding ---
    public function test_place_bid()
    {
        $this->bidServiceMock->shouldReceive('placeBid')->once()->andReturn(['id' => 501]);
        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/projects/101/bid", ['amount' => 100]);
        $response->assertStatus(200);
    }

    public function test_list_bids()
    {
        $this->bidServiceMock->shouldReceive('listBids')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/projects/101/bids");
        $response->assertStatus(200);
    }

    public function test_get_bid_fees()
    {
        $this->bidServiceMock->shouldReceive('getUpgradeFees')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/bids/fees");
        $response->assertStatus(200);
    }

    // --- Contests ---
    public function test_create_contest()
    {
        $this->contestServiceMock->shouldReceive('createContest')->once()->andReturn(['id' => 201]);
        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/contests", [
            'title' => 'Contest',
            'description' => 'Desc',
            'currency' => ['id' => 1],
            'budget' => ['min' => 10, 'max' => 20],
            'jobs' => [1],
            'duration' => 3
        ]);
        $response->assertStatus(200);
    }

    public function test_list_contests()
    {
        $this->contestServiceMock->shouldReceive('listContests')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/contests");
        $response->assertStatus(200);
    }

    public function test_search_active_contests()
    {
        $this->contestServiceMock->shouldReceive('searchActiveContests')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/contests/active?query=test");
        $response->assertStatus(200);
    }

    // --- Utilities ---
    public function test_get_categories()
    {
        $this->utilityServiceMock->shouldReceive('getCategories')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/categories");
        $response->assertStatus(200);
    }

    public function test_get_timezones()
    {
        $this->utilityServiceMock->shouldReceive('getTimezones')->once()->andReturn([]);
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/timezones");
        $response->assertStatus(200);
    }

    // --- Milestones (DB) ---
    public function test_milestone_crud()
    {
        $project = Project::create([
            'user_id' => $this->user->id,
            'name' => 'Test Project',
            'status' => 'active',
            'description' => 'Test Description',
            'currency' => ['code' => 'USD'],
            'budget' => 100.00,
            'seo_url' => 'test-project'
        ]);

        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/milestones", [
            'project_id' => $project->id,
            'bidder_id' => $this->user->id,
            'amount' => 50,
            'reason' => 'Deposit'
        ]);
        $response->assertStatus(200);

        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/milestones?projects[]={$project->id}");
        $response->assertStatus(200);
    }

    // --- Filters (DB) ---
    public function test_filter_crud()
    {
        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/filters", [
            'name' => 'My Filter',
            'filter_params' => ['min_budget' => 100]
        ]);
        $response->assertStatus(200);
        $filterId = $response->json('data.id');
        
        $response = $this->actingAs($this->user, 'api')->getJson("/api/freelancer/freelancer/{$this->account->uuid}/filters");
        $response->assertStatus(200);

        $response = $this->actingAs($this->user, 'api')->putJson("/api/freelancer/freelancer/{$this->account->uuid}/filters/{$filterId}", [
            'name' => 'Updated Filter'
        ]);
        $response->assertStatus(200);

        $response = $this->actingAs($this->user, 'api')->deleteJson("/api/freelancer/freelancer/{$this->account->uuid}/filters/{$filterId}");
        $response->assertStatus(200);
    }

    public function test_add_demo_filters()
    {
        $response = $this->actingAs($this->user, 'api')->postJson("/api/freelancer/freelancer/{$this->account->uuid}/filters/demo");
        $response->assertStatus(200);
    }
}
