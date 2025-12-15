<?php

namespace App\Services\Upwork;

use App\Models\Platform;
use App\Models\PlatformAccount;
use App\Models\IpAddress;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Exception;
use Illuminate\Support\Facades\Log;

class AuthService
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client(['timeout' => 20]);
    }

    /**
     * Generate OAuth redirect URL.
     */
    public function getRedirectUrl(string $platformSlug, string $ipUuid, string $sessionId): string
    {
        // $platform = Platform::where('slug', $platformSlug)->firstOrFail(); // Assuming 'upwork' slug exists
        
        $clientId    = config("services.upwork.client_id");
        $redirectUri = config("services.upwork.redirect_uri");
        
        // Upwork scopes? Usually not needed for simple auth, but maybe 'read_organization' etc.
        // Leaving empty or generic for now.
        $query = http_build_query([
            "response_type" => "code",
            "client_id"     => $clientId,
            "redirect_uri"  => $redirectUri,
            "state"         => $sessionId
        ]);

        return 'https://www.upwork.com/ab/account-security/oauth2/authorize?' . $query;
    }

    /**
     * Handle OAuth callback and create/update PlatformAccount.
     */
    public function handleCallback(string $platformSlug, string $code, int $userId, string $ipUuid): PlatformAccount
    {
        $platform = Platform::firstOrCreate(['slug' => 'upwork'], ['name' => 'Upwork', 'url' => 'https://www.upwork.com']);

        // Requested IP
        $requestedIp = IpAddress::where('uuid', $ipUuid)
            ->where('user_id', $userId)
            ->firstOrFail();

        // Check if user already has a platform account
        $existingAccount = PlatformAccount::where('user_id', $userId)
            ->where('platform_id', $platform->id)
            ->first();

        if ($existingAccount && $existingAccount->ip_id) {
            $ip = IpAddress::find($existingAccount->ip_id);
        } else {
            // Simple IP assignment logic for now
            $ip = $requestedIp;
        }

        // Exchange OAuth access token
        $tokenData = $this->exchangeToken($code);

        // Fetch user profile (mock or real if possible)
        // For Upwork, getting user info requires another call usually to GraphQL or v3/oauth2/info
        $profile = $this->getUserInfo($tokenData['access_token']);

        // Create / update platform account
        $account = PlatformAccount::updateOrCreate(
            [
                "user_id"     => $userId,
                "platform_id" => $platform->id
            ],
            [
                "ip_id"               => $ip->id,
                "oauth_access_token"  => $tokenData['access_token'],
                "oauth_refresh_token" => $tokenData['refresh_token'] ?? null,
                "token_expires_at"    => isset($tokenData['expires_in']) ? now()->addSeconds($tokenData['expires_in']) : null,
                "status"              => "active",
                "verified"            => true,
                "account_username"    => $profile['info']['name'] ?? 'Upwork User', // Upwork API structure varies
                "account_email"       => $profile['info']['email'] ?? null,
                "external_account_id" => $profile['info']['ref'] ?? null
            ]
        );

        // Assign IP if not already assigned
        if (!$ip->is_assigned) {
            $ip->update([
                'is_assigned' => true,
                'assigned_at' => now()
            ]);
        }

        return $account;
    }

    private function exchangeToken(string $code): array
    {
        $url = "https://www.upwork.com/api/v3/oauth2/token";
        $clientId = config("services.upwork.client_id");
        $clientSecret = config("services.upwork.client_secret");

        $response = $this->client->post($url, [
            'form_params' => [
                "grant_type"    => "authorization_code",
                "client_id"     => $clientId,
                "client_secret" => $clientSecret,
                "code"          => $code,
                "redirect_uri"  => config("services.upwork.redirect_uri"),
            ]
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    private function getUserInfo(string $accessToken): array
    {
        // Upwork User Info Endpoint
        $url = "https://www.upwork.com/api/v3/oauth2/info";
        
        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken
                ]
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (Exception $e) {
            Log::error("Failed to fetch Upwork user info: " . $e->getMessage());
            return ['info' => ['name' => 'Unknown', 'email' => null, 'ref' => null]];
        }
    }
}
