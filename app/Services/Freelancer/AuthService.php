<?php

namespace App\Services\Freelancer;

use App\Models\Platform;
use App\Models\PlatformAccount;
use App\Models\IpAddress;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Exception;

class AuthService
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client(['timeout' => 20]);
    }
    
    /**
 * Make authenticated request to Freelancer API
 *
 * @param PlatformAccount $account
 * @param string $method GET|POST
 * @param string $endpoint API endpoint (e.g., /projects/0.1/projects/123/)
 * @param array $options Guzzle options (query, json, etc.)
 * @return array
 * @throws Exception
 */
public function request(PlatformAccount $account, string $method, string $endpoint, array $options = []): array
{

    $this->ensureToken($account);

    $platform = Platform::where('slug', 'freelancer')->firstOrFail();
    // $platform->api_base_url = 'https://www.freelancer.com/api/0.1';
    $url = rtrim($platform->api_base_url, '/') . $endpoint;

    // Add Authorization header
    if (!isset($options['headers'])) {
        $options['headers'] = [];
    }

    $options['headers']['Authorization'] = 'Bearer ' . $account->oauth_access_token;
    $options['headers']['Accept'] = 'application/json';

    // Handle IP / Proxy binding
    if ($account->ip_id) {
        $ip = $account->ip;
        if ($ip) {
            if ($ip->provider === 'Webshare') {
                $proxyString = $ip->username && $ip->password
                    ? "{$ip->username}:{$ip->password}@{$ip->ip_address}:{$ip->port}"
                    : "{$ip->ip_address}:{$ip->port}";

                $options['proxy'] = "http://{$proxyString}";
            } else {
                $options['curl'][CURLOPT_INTERFACE] = $ip->ip_address;
            }
        }
    }

    try {
        // dd( $options,$url,$method, $account);
        $response = $this->client->request($method, $url, $options);
        // dd($response, $options,$url,$method);
        return json_decode($response->getBody()->getContents(), true);
    } catch (\Exception $e) {
        throw new Exception("Freelancer API request error: " . $e->getMessage());
    }
}


    /**
     * Generate OAuth redirect URL.
     */
    public function getRedirectUrl(string $platformSlug, string $ipUuid, string $sessionId): string
    {
        $platform = Platform::where('slug', $platformSlug)->firstOrFail();
        $user = auth('api')->user();

        $clientId    = config("services.freelancer.client_id");
        $redirectUri = config("services.freelancer.redirect_uri");
        $scopes = implode(' ', [
            'basic',
            'fln:user_information',
            'fln:project_manage',
            'fln:messaging',
            'fln:location_tracking_view'
        ]);

        $env = config('services.freelancer.environment', 'sandbox');

        $oauthBase = $env === 'production'
            ? 'https://www.freelancer.com/oauth/authorize'
            : 'https://accounts.freelancer-sandbox.com/oauth/authorize';

        $query = http_build_query([
            "response_type" => "code",
            "client_id"     => $clientId,
            "redirect_uri"  => $redirectUri,
            "scope"         => $scopes,
            "state"         => $sessionId // Use session ID as state
        ]);

        return $oauthBase . '?' . str_replace('+', '%20', $query);
    }

    /**
     * Handle OAuth callback and create/update PlatformAccount.
     */
    public function handleCallback(string $platformSlug, string $code, int $userId, string $ipUuid): PlatformAccount
{
    $platform = Platform::where('slug', $platformSlug)->firstOrFail();

    // Requested IP
    $requestedIp = IpAddress::where('uuid', $ipUuid)
        ->where('user_id', $userId)
        ->firstOrFail();

    // Check if user already has a platform account
    $existingAccount = PlatformAccount::where('user_id', $userId)
        ->where('platform_id', $platform->id)
        ->first();

    /**
     * If an account already exists AND it already has an IP assigned,
     * DO NOT show "IP assigned" error and DO NOT reassign.
     * Instead, always use the existing assigned IP.
     */
    if ($existingAccount && $existingAccount->ip_id) {
        $ip = IpAddress::find($existingAccount->ip_id);
    } else {
        // If no account exists or no IP assigned → use the requested IP

        // Check if requested IP is assigned to ANY account (not just this user)
        if (
            PlatformAccount::where('platform_id', $platform->id)
                ->where('ip_id', $requestedIp->id)
                ->exists()
        ) {
            // Do NOT throw error, DO NOT show message — just reuse existing user's IP
            if ($existingAccount && $existingAccount->ip_id) {
                $ip = IpAddress::find($existingAccount->ip_id);
            } else {
                // If totally new user and requested IP already used → fallback?
                // You can choose behavior; here we fallback to requested IP silently.
                $ip = $requestedIp;
            }
        } else {
            $ip = $requestedIp;
        }
    }

    // Exchange OAuth access token
    $tokenData = $this->exchangeToken($code);

    // Temporary account data to fetch profile
    $tempAccount = new PlatformAccount([
        "oauth_access_token"  => $tokenData['access_token'],
        "oauth_refresh_token" => $tokenData['refresh_token'] ?? null,
        "token_expires_at"    => now()->addSeconds($tokenData['expires_in'])
    ]);

    // Fetch user profile using selected IP
    $profile = $this->getAuthenticatedUser($tempAccount, $ip->ip_address);

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
            "token_expires_at"    => now()->addSeconds($tokenData['expires_in']),
            "status"              => "active",
            "verified"            => true,
            "account_username"    => $profile['username'] ?? null,
            "account_email"       => $profile['email'] ?? null,
            "external_account_id" => $profile['id'] ?? null
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
        $env = config("services.freelancer.environment", "sandbox");
        $url = $env === 'production'
            ? "https://www.freelancer.com/oauth/token"
            : "https://accounts.freelancer-sandbox.com/oauth/token";

        $response = $this->client->post($url, [
            'form_params' => [
                "grant_type"    => "authorization_code",
                "client_id"     => config("services.freelancer.client_id"),
                "client_secret" => config("services.freelancer.client_secret"),
                "redirect_uri"  => config("services.freelancer.redirect_uri"),
                "code"          => $code
            ]
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    /**
     * Fetch authenticated user using the assigned IP.
     * Ensures API call is made from the correct IP.
     */
    public function getAuthenticatedUser(PlatformAccount $account, string $ipAddress = null): array
    {
        $this->ensureToken($account);

        $platform = Platform::where("slug", "freelancer")->firstOrFail();
        $url = rtrim($platform->api_base_url, "/") . "/users/0.1/self/";

        // Default request options
        $options = [
            'headers' => [
                "Authorization" => "Bearer " . $account->oauth_access_token,
                "Accept"        => "application/json"
            ],
            'curl' => []
        ];

        /**
         * If IP is provided → load full info from DB
         */
        if ($ipAddress) {
            $ip = IpAddress::where('ip_address', $ipAddress)->first();

            if ($ip) {
                if ($ip->provider === 'Webshare') {
                    // -------------------------
                    // Webshare Proxy Handling
                    // -------------------------
                    $proxyString = $ip->username && $ip->password
                        ? "{$ip->username}:{$ip->password}@{$ip->ip_address}:{$ip->port}"
                        : "{$ip->ip_address}:{$ip->port}";

                    $options['proxy'] = "http://{$proxyString}";
                    $options['curl'][CURLOPT_PROXY] = $ip->ip_address;
                    $options['curl'][CURLOPT_PROXYPORT] = intval($ip->port);
                    $options['curl'][CURLOPT_PROXYUSERPWD] = "{$ip->username}:{$ip->password}";
                    $options['curl'][CURLOPT_PROXYTYPE] = CURLPROXY_HTTP;

                } else {
                    // -------------------------
                    // Local IP binding
                    // -------------------------
                    $options['curl'][CURLOPT_INTERFACE] = $ip->ip_address;
                }
            }
        }

        /**
         * Make the request
         */
        $response = $this->client->get($url, $options);

        $data = json_decode($response->getBody()->getContents(), true);

        return $data['result'] ?? $data;
    }


    /**
     * Ensure access token is valid, refresh if expired.
     */
    public function ensureToken(PlatformAccount $account)
    {
        if (!$account->oauth_access_token) {
            throw new Exception("Access token missing.");
        }

        if ($account->token_expires_at && $account->token_expires_at->isPast()) {
            $this->refreshToken($account);
        }
    }

    /**
     * Refresh expired token
     */
    private function refreshToken(PlatformAccount $account)
    {
        if (!$account->oauth_refresh_token) {
            throw new Exception("No refresh token available.");
        }

        $env = config("services.freelancer.environment", "sandbox");
        $url = $env === 'production'
            ? "https://www.freelancer.com/oauth/token"
            : "https://accounts.freelancer-sandbox.com/oauth/token";

        $response = $this->client->post($url, [
            'form_params' => [
                'grant_type'    => 'refresh_token',
                'client_id'     => config("services.freelancer.client_id"),
                'client_secret' => config("services.freelancer.client_secret"),
                'refresh_token' => $account->oauth_refresh_token
            ]
        ]);

        $data = json_decode($response->getBody()->getContents(), true);

        $account->update([
            'oauth_access_token'  => $data['access_token'],
            'oauth_refresh_token' => $data['refresh_token'] ?? $account->oauth_refresh_token,
            'token_expires_at'    => Carbon::now()->addSeconds($data['expires_in'])
        ]);
    }

    /**
     * Check if the IP exists on the server
     */
    private function isLocalIpAvailable(string $ip): bool
    {
        $localIps = [];
        exec('ip addr show', $output);
        foreach ($output as $line) {
            if (preg_match('/inet (\d+\.\d+\.\d+\.\d+)/', $line, $matches)) {
                $localIps[] = $matches[1];
            }
        }

        return in_array($ip, $localIps);
    }
}
