<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Services\SsrService;
use App\Models\Workflow;

$slug = 'test-workflow'; // Use an existing slug if possible, or create a dummy
$workflow = Workflow::where('status', 'published')->first();
if (!$workflow) {
    echo "No published workflow found.\n";
    exit;
}
$slug = $workflow->slug;

$url = "/workflow/$slug";
$context = [
    'workflow' => $workflow,
    'seo' => null,
    'relatedWorkflows' => [],
    'relevantBlogs' => []
];

echo "Rendering $url...\n";
config(['ssr.enabled' => true]);
try {
    $response = SsrService::render($url, $context);
    if ($response) {
        echo "SSR Success!\n";
        // echo substr($response, 0, 500) . "...\n";
    } else {
        echo "SSR Failed (returned null).\n";
    }
} catch (\Exception $e) {
    echo "Caught Exception: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
