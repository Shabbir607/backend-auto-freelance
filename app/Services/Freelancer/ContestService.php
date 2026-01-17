<?php

namespace App\Services\Freelancer;

use App\Models\Platform;
use App\Models\PlatformAccount;
use Exception;

class ContestService
{
    protected FreelancerService $freelancer;

    public function __construct(FreelancerService $freelancer)
    {
        $this->freelancer = $freelancer;
    }

    /**
     * Resolve connected account by platform slug + user
     */
    private function getAccount(string $platformSlug, int $userId): PlatformAccount
    {
        $platform = Platform::where('slug', $platformSlug)->firstOrFail();

        $account = PlatformAccount::where('platform_id', $platform->id)
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->first();

        if (!$account) {
            throw new Exception("No active connected account found for platform: {$platformSlug}");
        }

        if (!$account->external_account_id) {
            throw new Exception("External account ID missing. Sync your Freelancer account.");
        }

        return $account;
    }

    /**
     * Create a Contest
     * POST /contests/0.1/contests/
     */
    public function createContest(string $platformSlug, int $userId, array $data)
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->post(
            $account,
            '/contests/0.1/contests/',
            $data
        );
    }

    /**
     * Update a Contest
     * PUT /contests/0.1/contests/{contest_id}/
     */
    public function updateContest(string $platformSlug, int $userId, int $contestId, array $data)
    {
        $account = $this->getAccount($platformSlug, $userId);

        // PUT requests in Freelancer often take form-data or json. 
        // FreelancerService::post uses JSON by default if payload is array. 
        // We might need a specific PUT method in FreelancerService if it doesn't exist, 
        // or just use request() if exposed. 
        // Checking FreelancerService... it has get() and post(). 
        // I'll use the underlying request method via a helper or add put() to FreelancerService if needed.
        // For now, I'll assume I can access the request method or add a put wrapper.
        // Actually, FreelancerService has a protected request method. 
        // I should probably add a public 'put' method to FreelancerService or make request public.
        // I'll check FreelancerService again.
        
        // Since I can't easily modify FreelancerService in this same step without multiple tool calls,
        // and I want to keep this file clean, I'll assume I can use a magic call or just add the method to FreelancerService in the next step.
        // Wait, I can just use the `request` method if I make it public or use a public wrapper.
        // I'll check if `request` is public. It was protected in the view.
        // I'll add `put` to FreelancerService in the next step.
        // For now I will use a placeholder comment or try to call it if I modify FreelancerService first.
        // Actually, I'll modify FreelancerService first to add PUT/DELETE support.
        
        return $this->freelancer->put(
            $account,
            "/contests/0.1/contests/{$contestId}/",
            $data
        );
    }

    /**
     * List Contests
     * GET /contests/0.1/contests/
     */
    public function listContests(string $platformSlug, int $userId, array $params = [])
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->get(
            $account,
            '/contests/0.1/contests/',
            $params
        );
    }

    /**
     * Get Contest by ID
     * GET /contests/0.1/contests/{contest_id}/
     */
    public function getContest(string $platformSlug, int $userId, int $contestId)
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->get(
            $account,
            "/contests/0.1/contests/{$contestId}/"
        );
    }

    /**
     * Search Active Contests
     * GET /contests/0.1/contests/active/
     */
    public function searchActiveContests(string $platformSlug, int $userId, array $params = [])
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->get(
            $account,
            '/contests/0.1/contests/active/',
            $params
        );
    }

    /**
     * Search All Contests
     * GET /contests/0.1/contests/all/
     */
    public function searchAllContests(string $platformSlug, int $userId, array $params = [])
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->get(
            $account,
            '/contests/0.1/contests/all/',
            $params
        );
    }
}
