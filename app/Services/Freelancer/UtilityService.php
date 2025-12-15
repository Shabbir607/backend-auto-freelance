<?php

namespace App\Services\Freelancer;

use App\Models\PlatformAccount;

class UtilityService
{
    protected FreelancerService $freelancer;

    public function __construct(FreelancerService $freelancer)
    {
        $this->freelancer = $freelancer;
    }

    public function categories(PlatformAccount $account)
    {
        return $this->freelancer->get($account, '/api/projects/0.1/categories');
    }

    public function countries(PlatformAccount $account)
    {
        return $this->freelancer->get($account, '/api/common/0.1/countries');
    }

    public function currencies(PlatformAccount $account)
    {
        return $this->freelancer->get($account, '/api/projects/0.1/currencies');
    }
}
