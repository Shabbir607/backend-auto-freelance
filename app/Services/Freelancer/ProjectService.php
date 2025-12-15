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
            // Default to employer_id (Freelancer account owner)
            $filters['employer_id'] = (int)$account->external_account_id;
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
}
