<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            $ip = $request->ip();
            $user = $request->user();

            // 1. Check if the IP is persistently blocked (long-term)
            if (\Illuminate\Support\Facades\Cache::get("permanently_blocked_{$ip}")) {
                return Limit::perMinute(0)->by($ip)->response(function () {
                    return response()->json([
                        'message' => 'Your IP has been flagged for suspicious activity and is temporarily blocked.'
                    ], 403);
                });
            }

            if (! $user) {
                // Persistent limits for guests (usually scrapers)
                return [
                    // If they hit 10/min, we block them for 7 days
                    Limit::perMinute(20)->by($ip)->response(function () use ($ip) {
                        \Illuminate\Support\Facades\Cache::put("permanently_blocked_{$ip}", true, now()->addDays(7));
                        return response()->json([
                            'message' => 'Rate limit exceeded. Your IP has been blocked for 7 days.'
                        ], 403);
                    }),
                   
                ];
            }

            // Strict limits for authenticated users
            return [
                Limit::perMinute(40)->by($user->id),
                Limit::perHour(300)->by($user->id),
                Limit::perDay(1000)->by($user->id),
            ];
        });
    }
}
