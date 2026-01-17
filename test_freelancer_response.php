<?php

require __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
    'base_uri' => 'https://www.freelancer.com',
    'timeout'  => 60,
    'headers'  => [
        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
    ],
    'verify' => false,
]);

$seoUrl = 'websites-it-software/Build-Website-123456'; // Example, need a real one.
// Let's use a popular category to find a project or just search.
// Actually, let's just hit the search endpoint to find a valid SEO URL first, or just use a known one if possible.
// I'll try to find a project first.

try {
    // 1. Search for a project to get a valid SEO URL
    $response = $client->get('/api/projects/0.1/projects/active', [
        'query' => [
            'limit' => 1,
            'full_description' => 'true',
            'owner_details' => 'true',
        ]
    ]);
    
    $json = json_decode($response->getBody(), true);
    $project = $json['result']['projects'][0] ?? null;
    
    if ($project) {
        echo "Found Project: " . $project['seo_url'] . "\n";
        print_r($project['owner_info']);
        
        // Also check if there are other fields in $project related to client
        // e.g. location
        if (isset($project['location'])) {
            echo "Location: \n";
            print_r($project['location']);
        }
    } else {
        echo "No projects found.\n";
    }

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
