<?php

namespace App\Services\Freelancer;

use App\Models\Platform;
use App\Models\PlatformAccount;
use App\Models\IpAddress;
use GuzzleHttp\Client;
use Exception;

class AccountService
{
    protected Client $client;
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->client = new Client(['timeout' => 20]);
        $this->authService = $authService;
    }

    // List accounts
    public function listAccounts(string $platform_slug)
    {
        $platform = Platform::where('slug', $platform_slug)->firstOrFail();

        return PlatformAccount::where('platform_id', $platform->id)
            ->where('user_id', auth()->id())
            ->get();
    }

    // Create account
    public function createAccount(string $platform_slug, ?string $username = null, ?string $email = null, ?string $ip_address = null): PlatformAccount
    {
        $platform = Platform::where('slug', $platform_slug)->firstOrFail();

        // Get IP assigned to this user
        $ip = $ip_address
            ? IpAddress::where('ip_address', $ip_address)
                ->where('user_id', auth()->id())
                ->firstOrFail()
            : IpAddress::where('user_id', auth()->id())
                ->where('is_active', true)
                ->where('is_assigned', false)
                ->firstOrFail();

        $account = PlatformAccount::create([
            'user_id'           => auth()->id(),
            'platform_id'       => $platform->id,
            'ip_id'             => $ip->id,
            'account_username'  => $username ?? 'FreelancerUser_' . uniqid(),
            'account_email'     => $email ?? null,
            'status'            => 'active',
            'verified'          => false,
        ]);

        // Assign IP
        $ip->update([
            'is_assigned' => true,
            'assigned_at' => now(),
        ]);

        return $account;
    }

    // Update account
    public function updateAccount(PlatformAccount $account, array $data): PlatformAccount
    {
        if (isset($data['ip_address'])) {
            $ip = IpAddress::where('ip_address', $data['ip_address'])
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $account->ip_id = $ip->id;

            $ip->update([
                'is_assigned' => true,
                'assigned_at' => now(),
            ]);
        }

        if (isset($data['account_username'])) {
            $account->account_username = $data['account_username'];
        }

        if (isset($data['account_email'])) {
            $account->account_email = $data['account_email'];
        }

        if (isset($data['status'])) {
            $account->status = $data['status'];
        }

        $account->save();

        return $account;
    }

    // Delete account
    public function deleteAccount(PlatformAccount $account): bool
    {
        // Free IP
        $ip = $account->ip;
        if ($ip) {
            $ip->update([
                'is_assigned' => false,
                'assigned_at' => null,
            ]);
        }

        return $account->delete();
    }

    // Fetch profile from Freelancer using assigned IP
    public function fetchProfile(PlatformAccount $account): array
    {
        $ipId = $account->ip_id;
        $ip = IpAddress::find($ipId);
        
        if (!$ip) {
            throw new Exception("Account does not have an assigned IP.");
        }

        $userData = $this->authService->getAuthenticatedUser($account, $ip->ip_address);

        $account->update([
            'external_account_id' => $userData['id'] ?? null,
            'account_username'    => $userData['username'] ?? $account->account_username,
            'account_email'       => $userData['email'] ?? $account->account_email,
            'verified'            => true,
        ]);

        return $userData;
    }

    /**
     * Get User Reputations
     */
    public function getReputations(PlatformAccount $account, array $userIds)
    {
        $query = [];
        foreach ($userIds as $id) {
            $query[] = "users[]=" . urlencode($id);
        }
        $queryString = implode('&', $query);

        return $this->authService->request(
            $account,
            'GET',
            '/users/0.1/reputations/?' . $queryString
        );
    }

    /**
     * Get User Portfolios
     */
    public function getPortfolios(PlatformAccount $account, array $userIds)
    {
        $query = [];
        foreach ($userIds as $id) {
            $query[] = "users[]=" . urlencode($id);
        }
        $queryString = implode('&', $query);

        return $this->authService->request(
            $account,
            'GET',
            '/users/0.1/portfolios/?' . $queryString
        );
    }

    /**
     * Get User Details
     */
    public function getUser(PlatformAccount $account, int $userId)
    {
        return $this->authService->request(
            $account,
            'GET',
            "/users/0.1/users/{$userId}/"
        );
    }

    /**
     * Search Users by Username
     */
    public function searchUsers(PlatformAccount $account, array $usernames)
    {
        $query = [];
        foreach ($usernames as $username) {
            $query[] = "usernames[]=" . urlencode($username);
        }
        $queryString = implode('&', $query);

        return $this->authService->request(
            $account,
            'GET',
            '/users/0.1/users/?' . $queryString
        );
    }
}
