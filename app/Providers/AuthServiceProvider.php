<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Register Passport routes
        // Passport::routes();

        // Optional: Configure token expiration (example)
        // Passport::personalAccessTokensExpireIn(now()->addMonths(6));
        // Passport::tokensExpireIn(now()->addMonths(1));
        // Passport::refreshTokensExpireIn(now()->addMonths(2));
    }
}