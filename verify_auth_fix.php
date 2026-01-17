<?php

use App\Services\Freelancer\AuthService;
use App\Models\PlatformAccount;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $account = PlatformAccount::with('ipAddress')->find(1);
    if (!$account) {
        die("Account ID 1 not found.\n");
    }
    
    echo "Testing with Account ID: " . $account->id . "\n";
    echo "IP Address: " . ($account->ipAddress ? $account->ipAddress->ip_address : 'None') . "\n";

    $service = new AuthService();
    echo "Calling getAuthenticatedUser...\n";
    // We pass the IP to trigger the logic in getAuthenticatedUser
    $user = $service->getAuthenticatedUser($account, $account->ipAddress->ip_address);
    echo "Success! Retrieved user ID: " . ($user['id'] ?? 'Unknown') . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
