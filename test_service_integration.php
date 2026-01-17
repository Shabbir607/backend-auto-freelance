<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\Freelancer\FreelancerScraperService;
use Illuminate\Support\Facades\Auth;

// Mock Auth or just test direct connection first
echo "Testing Direct Connection (No Auth)...\n";
$service = new FreelancerScraperService();
$seoUrl = 'websites-it-software/Build-Website-123456'; // We need a real one ideally, or just check if it handles 404 gracefully or finds something.
// Let's use a known category/project if possible, or just a random one to see the request go out.
// I'll use the one found in previous step: book-cover-design/Illustrative-Spiritual-Book-Coveru
$seoUrl = 'ios-development/Square-NFC-Donation-App';

$project = $service->getProjectBySeoUrl($seoUrl);

if ($project) {
    echo "Project Found!\n";
    echo "Client City: " . ($project['owner_info']['city'] ?? 'N/A') . "\n";
    echo "Client Country: " . ($project['owner_info']['country']['name'] ?? 'N/A') . "\n";
} else {
    echo "Project not found or error.\n";
}

// TODO: To test proxy, we'd need to mock Auth::user() and have a user with an IP in the DB.
// For now, verifying the direct connection works and code doesn't crash is a good start.
