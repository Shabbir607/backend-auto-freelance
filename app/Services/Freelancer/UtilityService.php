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

    public function getCategories(string $platformSlug)
    {
        $account = $this->getAccount($platformSlug);
        return $this->freelancer->get($account, '/projects/0.1/categories');
    }

    public function getCountries(string $platformSlug)
    {
        $account = $this->getAccount($platformSlug);
        return $this->freelancer->get($account, '/common/0.1/countries');
    }

    public function getCurrencies(string $platformSlug)
    {
        $account = $this->getAccount($platformSlug);
        return $this->freelancer->get($account, '/projects/0.1/currencies');
    }

    private function getAccount(string $platformSlug)
    {
        // Use the first active account for the user to fetch public utility data
        // This avoids needing a specific account ID for generic data
        $platform = \App\Models\Platform::where('slug', $platformSlug)->firstOrFail();
        
        return \App\Models\PlatformAccount::where('platform_id', $platform->id)
            ->where('user_id', auth()->id())
            ->where('status', 'active')
            ->firstOrFail();
    }
    public function getTimezones(string $platformSlug)
    {
        $account = $this->getAccount($platformSlug);
        return $this->freelancer->get($account, '/common/0.1/timezones');
    }
}
