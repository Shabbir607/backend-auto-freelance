<?php

namespace Tests\Manual;

use Tests\TestCase;
use App\Models\User;
use App\Models\PlatformAccount;
use Illuminate\Support\Facades\Auth;

class TestAccountApis extends TestCase
{
    public function testAccountApis()
    {
        // 1. Login as a user (create if not exists)
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create();
            echo "Created new user: " . $user->email . "\n";
        }
        $this->actingAs($user, 'api');
        echo "Logged in as user: " . $user->email . "\n";

        // 2. Get a platform account (create if not exists)
        $account = PlatformAccount::where('user_id', $user->id)->first();
        if (!$account) {
            // Need a platform first
            $platform = \App\Models\Platform::first();
            if (!$platform) {
                 $platform = \App\Models\Platform::create([
                    'name' => 'Freelancer',
                    'slug' => 'freelancer',
                    'url' => 'https://www.freelancer.com',
                    'is_active' => true
                 ]);
            }
            
            // Need an IP
            $ip = \App\Models\IpAddress::create([
                'ip_address' => '127.0.0.1',
                'user_id' => $user->id,
                'is_active' => true,
                'is_assigned' => true,
                'assigned_at' => now()
            ]);

            $account = PlatformAccount::create([
                'user_id' => $user->id,
                'platform_id' => $platform->id,
                'ip_id' => $ip->id,
                'account_username' => 'test_user',
                'status' => 'active',
                'uuid' => \Illuminate\Support\Str::uuid()
            ]);
            echo "Created new platform account.\n";
        }
        echo "Using account UUID: " . $account->uuid . "\n";
        $platformSlug = $account->platform->slug;

        // 3. Test 'reputations' endpoint (Optional users param)
        echo "\nTesting 'reputations' (without users param)...\n";
        
        $ipUuid = 'e2917509-b646-4ebd-9edc-70cf1f956ef1'; 

        $response = $this->getJson("/api/freelancer/{$platformSlug}/{$account->uuid}/{$ipUuid}/reputations");
        if ($response->status() !== 422) { 
             echo "SUCCESS: Status: " . $response->status() . "\n";
        } else {
             echo "FAILURE: Validation failed.\n";
             dump($response->json());
        }

        // 4. Test 'portfolios' endpoint (Optional users param)
        echo "\nTesting 'portfolios' (without users param)...\n";
        $response = $this->getJson("/api/freelancer/{$platformSlug}/{$account->uuid}/{$ipUuid}/portfolios");
        if ($response->status() !== 422) {
             echo "SUCCESS: Status: " . $response->status() . "\n";
        } else {
             echo "FAILURE: Validation failed.\n";
             dump($response->json());
        }
        
        // 5. Test 'searchUsers' endpoint
        echo "\nTesting 'searchUsers'...\n";
        $response = $this->getJson("/api/freelancer/{$platformSlug}/{$account->uuid}/{$ipUuid}/users/search?usernames[]=test");
        if ($response->status() !== 422) {
             echo "SUCCESS: Status: " . $response->status() . "\n";
        } else {
             echo "FAILURE: Validation failed.\n";
             dump($response->json());
        }

        // 6. Test 'getUser' endpoint
        echo "\nTesting 'getUser'...\n";
        $response = $this->getJson("/api/freelancer/{$platformSlug}/{$account->uuid}/{$ipUuid}/users/12345");
        if ($response->status() !== 422) {
             echo "SUCCESS: Status: " . $response->status() . "\n";
        } else {
             echo "FAILURE: Validation failed.\n";
             dump($response->json());
        }
    }
}
