<?php

namespace Tests\Feature;

use App\Jobs\SyncFreelancerMessages;
use App\Jobs\SyncFreelancerThreads;
use App\Models\FreelancerMessage;
use App\Models\FreelancerThread;
use App\Models\Platform;
use App\Models\PlatformAccount;
use App\Models\User;
use App\Services\Freelancer\AuthService;
use App\Services\Freelancer\ThreadService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Queue;
use Mockery;
use Tests\TestCase;

class FreelancerSyncTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Mock AuthService to avoid real API calls
        $this->mockAuthService = Mockery::mock(AuthService::class);
        $this->app->instance(AuthService::class, $this->mockAuthService);
    }

    public function test_sync_threads_job_fetches_and_stores_threads()
    {
        Bus::fake();

        $user = User::factory()->create();
        $platform = Platform::create(['name' => 'Freelancer', 'slug' => 'freelancer']);
        $account = PlatformAccount::create([
            'user_id' => $user->id,
            'platform_id' => $platform->id,
            'account_username' => 'test_user',
            'access_token' => 'fake_token',
            'platform_user_id' => 12345
        ]);

        $this->mockAuthService->shouldReceive('request')
            ->once()
            ->with($account, 'GET', '/messages/0.1/threads/', Mockery::any())
            ->andReturn([
                'result' => [
                    'threads' => [
                        [
                            'id' => 1001,
                            'members' => [12345, 67890],
                            'context' => ['type' => 'project', 'id' => 555],
                            'is_archived' => false,
                            'is_muted' => false,
                            'message' => 'Last message content'
                        ]
                    ]
                ]
            ]);

        $job = new SyncFreelancerThreads($account);
        $job->handle($this->mockAuthService);

        $this->assertDatabaseHas('freelancer_threads', [
            'platform_account_id' => $account->id,
            'freelancer_thread_id' => '1001'
        ]);

        Bus::assertDispatched(SyncFreelancerMessages::class);
    }

    public function test_sync_messages_job_fetches_and_stores_messages()
    {
        $user = User::factory()->create();
        $platform = Platform::create(['name' => 'Freelancer', 'slug' => 'freelancer']);
        $account = PlatformAccount::create([
            'user_id' => $user->id,
            'platform_id' => $platform->id,
            'account_username' => 'test_user',
            'access_token' => 'fake_token',
            'platform_user_id' => 12345
        ]);

        $thread = FreelancerThread::create([
            'platform_account_id' => $account->id,
            'user_id' => $user->id,
            'freelancer_thread_id' => '1001',
            'participants' => [],
            'last_message_at' => now()
        ]);

        $this->mockAuthService->shouldReceive('request')
            ->once()
            ->with($account, 'GET', "/messages/0.1/threads/1001/messages/", Mockery::any())
            ->andReturn([
                'result' => [
                    'messages' => [
                        [
                            'id' => 5001,
                            'from_user' => 67890,
                            'message' => 'Hello World',
                            'timestamp' => time(),
                            'attachments' => []
                        ]
                    ]
                ]
            ]);

        $job = new SyncFreelancerMessages($thread);
        $job->handle($this->mockAuthService);

        $this->assertDatabaseHas('freelancer_messages', [
            'freelancer_thread_id' => $thread->id,
            'freelancer_message_id' => '5001',
            'body' => 'Hello World'
        ]);
    }

    public function test_thread_service_returns_local_threads()
    {
        $user = User::factory()->create();
        $platform = Platform::create(['name' => 'Freelancer', 'slug' => 'freelancer']);
        $account = PlatformAccount::create([
            'user_id' => $user->id,
            'platform_id' => $platform->id,
            'account_username' => 'test_user',
            'access_token' => 'fake_token',
            'platform_user_id' => 12345
        ]);

        FreelancerThread::create([
            'platform_account_id' => $account->id,
            'user_id' => $user->id,
            'freelancer_thread_id' => '1001',
            'participants' => [],
            'last_message_at' => now()
        ]);

        $this->actingAs($user, 'api');

        $service = new ThreadService($this->mockAuthService);
        $result = $service->listThreads();

        $this->assertCount(1, $result['threads']);
        $this->assertEquals('1001', $result['threads'][0]['freelancer_thread_id']);
    }
}
