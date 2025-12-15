<?php

namespace App\Services\Freelancer;

use App\Jobs\SyncFreelancerThreads;
use App\Models\FreelancerThread;
use App\Models\PlatformAccount;
use Exception;

class ThreadService
{
    protected AuthService $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Fetch all Freelancer accounts for the user
     */
    private function accounts(): \Illuminate\Support\Collection
    {
        return auth()->user()
            ->platformAccounts()
            ->whereHas("platform", fn($q) => $q->where("slug", "freelancer"))
            ->get();
    }

    /**
     * List threads from LOCAL database
     */
    public function listThreads(array $query = []): array
    {
        $accountIds = $this->accounts()->pluck('id');

        $threads = FreelancerThread::whereIn('platform_account_id', $accountIds)
            ->with(['account', 'lastMessage']) // Assuming relations exist
            ->orderByDesc('last_message_at')
            ->paginate($query['limit'] ?? 20);

        return [
            "threads" => $threads->items(),
            "meta" => [
                "current_page" => $threads->currentPage(),
                "last_page" => $threads->lastPage(),
                "total" => $threads->total(),
            ]
        ];
    }

    /**
     * Trigger sync for all accounts
     */
    public function sync(): void
    {
        foreach ($this->accounts() as $account) {
            SyncFreelancerThreads::dispatch($account);
        }
    }

    /**
     * Get a single thread (from local DB)
     */
    public function getThread(PlatformAccount $account, string $threadId, array $query = []): array
    {
        // Try to find locally first
        $thread = FreelancerThread::where('platform_account_id', $account->id)
            ->where('freelancer_thread_id', $threadId)
            ->first();

        if ($thread) {
            return $thread->toArray();
        }

        // Fallback to API if not found locally (and maybe sync?)
        return $this->auth->request(
            $account,
            'GET',
            "/messages/0.1/threads/{$threadId}/",
            ["query" => $query]
        );
    }

    /**
     * Create a new thread (API call + Sync)
     */
    public function createThread(PlatformAccount $account, array $payload): array
    {
        $response = $this->auth->request(
            $account,
            'POST',
            "/messages/0.1/threads/",
            ["json" => $payload]
        );

        // Trigger sync to fetch the new thread
        SyncFreelancerThreads::dispatch($account);

        return $response;
    }

    /**
     * Send a message inside thread (API call + Sync)
     */
    public function sendMessage(PlatformAccount $account, string $threadId, array $payload): array
    {
        $response = $this->auth->request(
            $account,
            'POST',
            "/messages/0.1/threads/{$threadId}/messages/",
            ["json" => $payload]
        );

        // Trigger sync to fetch the new message
        // Ideally we'd know the thread ID to sync just that one
        SyncFreelancerThreads::dispatch($account);

        return $response;
    }

    /**
     * Update thread actions (mute, read, archive, etc)
     */
    public function updateThread(PlatformAccount $account, array $payload): array
    {
        $response = $this->auth->request(
            $account,
            'PUT',
            "/messages/0.1/threads/",
            ["json" => $payload]
        );

        SyncFreelancerThreads::dispatch($account);

        return $response;
    }

    /**
     * Typing indicator
     */
    public function typing(PlatformAccount $account, string $threadId): array
    {
        return $this->auth->request(
            $account,
            'POST',
            "/messages/0.1/threads/{$threadId}/typing/",
            []
        );
    }

    /**
     * Search inside ALL threads for ALL accounts (Local Search)
     */
    public function search(array $query): array
    {
        $accountIds = $this->accounts()->pluck('id');
        $searchTerm = $query['q'] ?? '';

        // Simple local search implementation
        // For better search, might need full-text search or Scout
        $threads = FreelancerThread::whereIn('platform_account_id', $accountIds)
            ->where(function($q) use ($searchTerm) {
                $q->where('metadata->snippet', 'like', "%{$searchTerm}%") // Assuming snippet is in metadata
                  ->orWhere('freelancer_thread_id', 'like', "%{$searchTerm}%");
            })
            ->get();

        return [
            "results" => $threads,
            "accounts" => $accountIds
        ];
    }
}
