<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

use Illuminate\Http\Request;

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

function testUrl($url, $kernel) {
    echo "\n--- Testing SSR for: $url ---\n";
    $request = Request::create($url, 'GET');
    
    // Proper Laravel request handling boots up all providers & facades
    $response = $kernel->handle($request);
    $html = $response->getContent();
    
    // Check for critical SEO signals
    $hasRoot = strpos($html, '<div id="root">') !== false;
    $hasContent = strlen($html) > 5000;
    $hasLinks = preg_match_all('/<a /', $html, $matches);
    $hasSchema = strpos($html, 'application/ld+json') !== false;
    
    echo "Status Code: " . $response->getStatusCode() . "\n";
    echo "Root Div: " . ($hasRoot ? "YES" : "NO") . "\n";
    echo "HTML Length: " . strlen($html) . " bytes\n";
    echo "Links Count: " . count($matches[0] ?? []) . "\n";
    echo "Schema Found: " . ($hasSchema ? "YES" : "NO") . "\n";
    
    if (count($matches[0] ?? []) > 0 && strlen($html) > 5000) {
        echo "SSR SUCCESS: Full HTML rendered.\n";
    } else {
        echo "SSR FAILURE: Only empty shell rendered or low content.\n";
    }

    $kernel->terminate($request, $response);
}

testUrl('/', $kernel);
testUrl('/blogs', $kernel);
testUrl('/workflows', $kernel);
