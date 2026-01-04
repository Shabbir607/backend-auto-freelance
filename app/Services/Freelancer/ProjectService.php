<?php

namespace App\Services\Freelancer;

use App\Models\Platform;
use App\Models\PlatformAccount;
use Exception;

class ProjectService
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
     * Automatically inject required Freelancer filters:
     * - employer_id
     * - contractor_id
     */
    private function applyRequiredProjectFilters(PlatformAccount $account, array $filters): array
    {
        // If user did not pass required Freelancer API filter
        if (
            !isset($filters['employer_id']) &&
            !isset($filters['contractor_id']) &&
            !isset($filters['owners']) &&
            !isset($filters['project_ids'])
        ) {
            if (!$account->external_account_id) {
                 throw new Exception("External account ID missing. Please sync your profile first.");
            }
            // Default to owners[] (Freelancer account owner)
            $filters['owners'] = [(int)$account->external_account_id];
        }

        return $filters;
    }




    /**
     * List projects for Freelancer account
     */
    public function listProjects(string $platformSlug, int $userId, array $filters = [])
    {
        $account = $this->getAccount($platformSlug, $userId);

        $filters = $this->applyRequiredProjectFilters($account, $filters);

        return $this->freelancer->get(
            $account,
            '/projects/0.1/projects',
            $filters
        );
    }



    /**
     * Create a project
     */
    public function createProject(string $platformSlug, int $userId, array $data)
    {
        $account = $this->getAccount($platformSlug, $userId);

        // Ensure employer_id is added
        if (!isset($data['employer_id'])) {
            $data['employer_id'] = (int)$account->external_account_id;
        }

        return $this->freelancer->post(
            $account,
            '/projects/0.1/projects',
            $data
        );
    }



    /**
     * Get single project details
     */
    public function getProject(string $platformSlug, int $userId, $projectId)
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->get(
            $account,
            "/projects/0.1/projects/{$projectId}"
        );
    }



    /**
     * Update a project
     */
    public function updateProject(string $platformSlug, int $userId, $projectId, array $data)
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->post(
            $account,
            "/projects/0.1/projects/{$projectId}",
            $data
        );
    }



    /**
     * Delete a project
     */
    public function deleteProject(string $platformSlug, int $userId, $projectId)
    {
        $account = $this->getAccount($platformSlug, $userId);

        return $this->freelancer->post(
            $account,
            "/projects/0.1/projects/{$projectId}/delete"
        );
    }


    /**
     * List projects from ALL active accounts with their specific filters
     */
    /**
     * List projects from ALL active accounts with their specific filters
     */
    public function listAllProjects(string $platformSlug, int $userId)
    {
        $platform = Platform::where('slug', $platformSlug)->firstOrFail();
        
        $accounts = PlatformAccount::where('platform_id', $platform->id)
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->with('filters') // Eager load filters
            ->get();

        $allProjects = [];

        foreach ($accounts as $account) {
            // Check for active filters
            $activeFilters = $account->filters()->where('is_active', true)->get();

            if ($activeFilters->isNotEmpty()) {
                foreach ($activeFilters as $filter) {
                    try {
                        $params = $filter->filter_params;
                        // Ensure limit is reasonable
                        $params['limit'] = $params['limit'] ?? 10;

                        $response = $this->freelancer->get(
                            $account,
                            '/projects/0.1/projects/active',
                            $params
                        );

                        // Handle API response structure (usually wrapped in 'result')
                        $projects = $response['result']['projects'] ?? $response['projects'] ?? [];

                        if (empty($projects)) {
                            continue;
                        }

                        // Strict Filtering: Ensure projects match keywords/skills locally
                        // This handles cases where the API returns broad results
                        $projects = $this->filterProjectsStrictly($projects, $params);

                        // Append account details
                        foreach ($projects as &$project) {
                            $project['account_details'] = [
                                'id' => $account->id,
                                'uuid' => $account->uuid,
                                'username' => $account->account_username,
                                'email' => $account->account_email,
                            ];
                        }

                        $allProjects = array_merge($allProjects, $projects);

                    } catch (Exception $e) {
                        // Log error but continue
                        // Log::error("Failed to fetch projects for filter {$filter->id}: " . $e->getMessage());
                    }
                }
            }
        }

        // Remove duplicates based on project ID (if multiple accounts see the same project)
        $allProjects = collect($allProjects)->unique('id')->values()->all();

        return ['projects' => $allProjects];
    }

    /**
     * Strictly filter projects locally to ensure relevance
     */
    private function filterProjectsStrictly(array $projects, array $params): array
    {
        return array_filter($projects, function ($project) use ($params) {
            // 1. Keyword Filter (Title/Description)
            if (!empty($params['query'])) {
                $query = strtolower($params['query']);
                $title = strtolower($project['title'] ?? '');
                $desc = strtolower($project['preview_description'] ?? $project['description'] ?? '');
                
                // Check if ALL keywords exist (strict) or ANY (loose). 
                // Let's go with simple "contains" for the query string
                if (!str_contains($title, $query) && !str_contains($desc, $query)) {
                    return false;
                }
            }

            // 2. Min Budget Filter
            if (isset($params['min_budget']) && isset($project['budget']['minimum'])) {
                if ($project['budget']['minimum'] < $params['min_budget']) {
                    return false;
                }
            }

            // 3. Max Budget Filter
            if (isset($params['max_budget']) && isset($project['budget']['maximum'])) {
                if ($project['budget']['maximum'] > $params['max_budget']) {
                    return false;
                }
            }

            // 4. Job/Skill Filter
            if (!empty($params['jobs']) && is_array($params['jobs']) && !empty($project['jobs'])) {
                $projectJobIds = array_column($project['jobs'], 'id');
                // Check if project has AT LEAST ONE of the required skills
                if (empty(array_intersect($params['jobs'], $projectJobIds))) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Helper to attach account details to each project
     * (Kept for compatibility if used elsewhere, but logic moved inline for listAllProjects)
     */
    private function appendAccountDetails(array &$projectsResponse, PlatformAccount $account)
    {
        // Handle different response structures
        $projects = &$projectsResponse['result']['projects'] ?? $projectsResponse['projects'] ?? null;

        if ($projects && is_array($projects)) {
            foreach ($projects as &$project) {
                $project['account_details'] = [
                    'id' => $account->id,
                    'uuid' => $account->uuid,
                    'username' => $account->account_username,
                    'email' => $account->account_email,
                ];
            }
        }
    }
}
