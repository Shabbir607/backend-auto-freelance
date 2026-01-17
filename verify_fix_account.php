<?php

use App\Services\Freelancer\FreelancerJobService;
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

    $service = new FreelancerJobService();
    echo "Calling listJobs...\n";
    $jobs = $service->listJobs(['limit' => 1], $account); 
    echo "Success! Retrieved " . count($jobs) . " jobs.\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
