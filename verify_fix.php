<?php

use App\Services\Freelancer\FreelancerJobService;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $service = new FreelancerJobService();
    echo "Calling listJobs...\n";
    // Call without account to verify default path
    $jobs = $service->listJobs(['limit' => 1]); 
    echo "Success! Retrieved " . count($jobs) . " jobs.\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
