<?php

namespace App\Services\Freelancer;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Exception;
use App\Models\PlatformAccount;
use App\Models\IPAddress;

class FreelancerJobService
{
    protected string $baseUrl = 'https://www.freelancer.com/api';
    protected Client $client;
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = env('FREELANCER_API_KEY', '');
        $this->client = new Client([
            'timeout' => 60,
        ]);
    }

    /**
     * Generic GET request
     */
    /**
     * Generic GET request with optional proxy support
     */
    private function get(string $endpoint, array $params = [], ?PlatformAccount $account = null): array
    {
        try {
            $options = [
                'headers' => [
                    'freelancer-oauth-v1' => $this->apiKey,
                    'Accept' => 'application/json',
                ],
                'query' => $params,
            ];

            // Configure Proxy if account is provided
            if ($account && $account->ip) {
                $ip = $account->ip;
                if ($ip->provider === 'Webshare' && $ip->port && $ip->ip_address !== '127.0.0.1') {
                    $proxyString = $ip->username && $ip->password
                        ? "{$ip->username}:{$ip->password}@{$ip->ip_address}:{$ip->port}"
                        : "{$ip->ip_address}:{$ip->port}";

                    $options['proxy'] = "http://{$proxyString}";
                } elseif ($ip->ip_address !== '127.0.0.1') {
                    $options['curl'] = [
                        CURLOPT_INTERFACE => $ip->ip_address
                    ];
                }
            }
// dd($this->baseUrl . $endpoint,$options,$account);
            $response = $this->client->get($this->baseUrl . $endpoint, $options);

            $data = json_decode($response->getBody()->getContents(), true);

            if (!isset($data['status']) || $data['status'] !== 'success') {
                throw new Exception($data['message'] ?? 'Unknown Freelancer API error');
            }

            return $data['result'] ?? [];
        } catch (GuzzleException $e) {
            throw new Exception("HTTP request failed: " . $e->getMessage());
        } catch (Exception $e) {
            throw new Exception("Freelancer API error: " . $e->getMessage());
        }
    }

    /**
     * List job skill categories
     */
    public function listJobs(array $params = [], ?PlatformAccount $account = null): array
    {
        return $this->get('/projects/0.1/jobs/', $params, $account);
    }

    /**
     * Search jobs
     */
    public function searchJobs(array $params = [], ?PlatformAccount $account = null): array
    {
        return $this->get('/projects/0.1/jobs/search/', $params, $account);
    }

    /**
     * Job bundles
     */
    public function jobBundles(array $params = [], ?PlatformAccount $account = null): array
    {
        return $this->get('/projects/0.1/job_bundles/', $params, $account);
    }

    /**
     * Job bundle categories
     */
    public function jobBundleCategories(array $params = [], ?PlatformAccount $account = null): array
    {
        return $this->get('/projects/0.1/job_bundle_categories/', $params, $account);
    }

    /**
     * Get list of projects with filters
     * e.g., jobs[], limit, offset, query, min_budget, max_budget, full_description, sort
     */
    public function listProjects(array $params = [], ?PlatformAccount $account = null): array
    {
        return $this->get('/projects/0.1/projects/active/', $params, $account);
    }

    /**
     * Get full project details by project ID
     */
    public function getProject(int $projectId, ?PlatformAccount $account = null): array
    {
        return $this->get("/projects/0.1/projects/{$projectId}/", [], $account);
    }
}
