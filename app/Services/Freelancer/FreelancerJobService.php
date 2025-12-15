<?php

namespace App\Services\Freelancer;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Exception;

class FreelancerJobService
{
    protected string $baseUrl = 'https://www.freelancer.com/api';
    protected Client $client;
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = env('FREELANCER_API_KEY', '');
        $this->client = new Client([
            'timeout' => 30,
        ]);
    }

    /**
     * Generic GET request
     */
    private function get(string $endpoint, array $params = []): array
    {
        try {
            $response = $this->client->get($this->baseUrl . $endpoint, [
                'headers' => [
                    'freelancer-oauth-v1' => $this->apiKey,
                    'Accept' => 'application/json',
                ],
                'query' => $params,
            ]);

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
    public function listJobs(array $params = []): array
    {
        return $this->get('/projects/0.1/jobs/', $params);
    }

    /**
     * Search jobs
     */
    public function searchJobs(array $params = []): array
    {
        return $this->get('/projects/0.1/jobs/search/', $params);
    }

    /**
     * Job bundles
     */
    public function jobBundles(array $params = []): array
    {
        return $this->get('/projects/0.1/job_bundles/', $params);
    }

    /**
     * Job bundle categories
     */
    public function jobBundleCategories(array $params = []): array
    {
        return $this->get('/projects/0.1/job_bundle_categories/', $params);
    }

    /**
     * Get list of projects with filters
     * e.g., jobs[], limit, offset, query, min_budget, max_budget, full_description, sort
     */
    public function listProjects(array $params = []): array
    {
        return $this->get('/projects/0.1/projects/active/', $params);
    }

    /**
     * Get full project details by project ID
     */
    public function getProject(int $projectId): array
    {
        return $this->get("/projects/0.1/projects/{$projectId}/");
    }
}
