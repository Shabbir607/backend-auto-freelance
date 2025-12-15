<?php

namespace App\Services\Freelancer;

use App\Models\Platform;
use App\Models\PlatformAccount;
use Exception;

class BidService
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Resolve active PlatformAccount by UUID and platform slug
     */
    private function getAccount(string $platformSlug, string $uuid): PlatformAccount
    {
        $platform = Platform::where('slug', $platformSlug)->firstOrFail();

        $account = PlatformAccount::where('uuid', $uuid)
            ->where('platform_id', $platform->id)
            ->where('status', 'active')
            ->first();

        if (!$account) {
            throw new Exception("Active PlatformAccount not found for UUID: {$uuid}");
        }

        if (!$account->external_account_id) {
            throw new Exception("PlatformAccount missing external account ID. Please sync your Freelancer account.");
        }

        return $account;
    }

    /**
     * Place a bid on a project
     *
     * @param string $platformSlug
     * @param string $uuid
     * @param array $data ['project_id', 'amount', 'message', 'currency', 'delivery_days']
     */
public function placeBid(string $platformSlug, string $uuid, array $data): array
{
    $account = $this->getAccount($platformSlug, $uuid);
    $this->authService->ensureToken($account);

    foreach (['project_id', 'amount', 'message', 'delivery_days'] as $field) {
        if (!isset($data[$field])) {
            throw new Exception("Required field missing: {$field}");
        }
    }

    $payload = [
    "project_id"   => 39986560,
    "bidder_id"    => 25969213,
    "amount"       => 1500.0,
    "period"       => 7,
    "message"      => "I can complete this project efficiently using Laravel.",
    "currency"     => "USD",
    "is_anonymous" => false,
    "mileston"     => [   // ✅ Correct field name
        "amount"      => 1500.0,
        "description" => "Full payment for project completion",
        "is_optional" => false
    ]
];


    return $this->authService->request(
        $account,
        'POST',
        '/projects/0.1/bids/',
        ['json' => $payload]
    );
}





    /**
     * List all bids for a project
     */
    public function listBids(string $platformSlug, string $uuid, int $projectId): array
    {
        $account = $this->getAccount($platformSlug, $uuid);

        $this->authService->ensureToken($account);

        return $this->authService->request(
            $account,
            'GET',
            "/projects/0.1/projects/{$projectId}/bids/"
        );
    }
}
