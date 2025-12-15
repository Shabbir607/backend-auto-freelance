<?php

namespace App\Jobs;

use App\Models\FreelancerThread;
use App\Models\PlatformAccount;
use App\Services\Freelancer\AuthService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncFreelancerThreads implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected PlatformAccount $account;

    public function __construct(PlatformAccount $account)
    {
        $this->account = $account;
    }

    public function handle(AuthService $authService)
    {
        try {
            $response = $authService->request(
                $this->account,
                'GET',
                '/messages/0.1/threads/',
                ['query' => ['limit' => 20]] // Fetch recent threads
            );

            if (!isset($response['result']['threads'])) {
                Log::warning("SyncFreelancerThreads: No threads found for account {$this->account->id}");
                return;
            }

            foreach ($response['result']['threads'] as $threadData) {
                $thread = FreelancerThread::updateOrCreate(
                    [
                        'platform_account_id' => $this->account->id,
                        'freelancer_thread_id' => $threadData['id']
                    ],
                    [
                        'user_id'       => $this->account->user_id,
                        'participants'  => $threadData['members'] ?? [],
                        'context_type'  => $threadData['context']['type'] ?? null,
                        'context_id'    => $threadData['context']['id'] ?? null,
                        'last_message_at' => now(), // Ideally parse from message if available
                        'is_archived'   => $threadData['is_archived'] ?? false,
                        'is_muted'      => $threadData['is_muted'] ?? false,
                        'metadata'      => $threadData
                    ]
                );

                // Dispatch job to sync messages for this thread
                SyncFreelancerMessages::dispatch($thread);
            }

        } catch (\Throwable $e) {
            Log::error("SyncFreelancerThreads failed for account {$this->account->id}: " . $e->getMessage());
        }
    }
}
