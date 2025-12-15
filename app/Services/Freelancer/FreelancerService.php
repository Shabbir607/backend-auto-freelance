<?php

namespace App\Services\Freelancer;

use App\Models\PlatformAccount;
use Illuminate\Support\Facades\Http;
use Exception;

class FreelancerService
{
    protected string $clientId;
    protected string $clientSecret;
    protected string $redirectUri;
    protected string $baseUrl;

    public function __construct()
    {
        $this->clientId      = config('services.freelancer.client_id');
        $this->clientSecret  = config('services.freelancer.client_secret');
        $this->redirectUri   = config('services.freelancer.redirect_uri');
        $this->baseUrl       = rtrim(config('services.freelancer.base_url'), '/');
    }

    /**
     * Core GET request
     */
    public function get(PlatformAccount $account, string $endpoint, array $params = [])
    {
        return $this->request($account, 'GET', $endpoint, $params);
    }

    /**
     * Core POST request
     */
    public function post(PlatformAccount $account, string $endpoint, array $payload = [])
    {
        return $this->request($account, 'POST', $endpoint, [], $payload);
    }

    /**
     * Generic request with IP header
     */
    protected function request(PlatformAccount $account, string $method, string $endpoint, array $query = [], array $payload = [])
    {
        if (!$account->oauth_access_token) {
            throw new Exception("Account not connected or missing access token.");
        }

        $headers = [
            'Authorization' => "Bearer {$account->oauth_access_token}",
            'Accept'        => 'application/json',
        ];

        // Pass assigned IP if available
        if ($account->ip) {
            $headers['X-Forwarded-For'] = $account->ip->ip_address;
        }

        $url = "{$this->baseUrl}/" . ltrim($endpoint, '/');

        $response = Http::withHeaders($headers)->$method($url, $method === 'GET' ? $query : $payload);

        if (!$response->successful()) {
            throw new Exception("API Error: {$response->body()}");
        }

        return $response->json();
    }

    /**
     * OAuth2 Authorization URL
     */
    public function getAuthUrl(PlatformAccount $account): string
    {
        $state = encrypt(json_encode(['account_id' => $account->id]));
        $scopes = 'basic fln:project_create fln:project_manage fln:contest_create fln:contest_manage fln:messaging fln:user_information';

        return "{$this->baseUrl}/oauth/authorize?" . http_build_query([
            'response_type' => 'code',
            'client_id' => $this->clientId,
            'redirect_uri' => $this->redirectUri,
            'scope' => $scopes,
            'state' => $state
        ]);
    }

    /**
     * Exchange code for token
     */
    public function exchangeCode(string $code)
    {
        $response = Http::asForm()->post("{$this->baseUrl}/oauth/token", [
            'grant_type'    => 'authorization_code',
            'client_id'     => $this->clientId,
            'client_secret' => $this->clientSecret,
            'redirect_uri'  => $this->redirectUri,
            'code'          => $code,
        ]);

        if (!$response->successful()) {
            throw new Exception("Token exchange failed: {$response->body()}");
        }

        return $response->json();
    }
}
