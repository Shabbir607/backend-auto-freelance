<?php

use App\Models\IpAddress;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$ip = IpAddress::find(7);
if ($ip) {
    echo "ID: " . $ip->id . "\n";
    echo "IP: " . $ip->ip_address . "\n";
    echo "Port: " . $ip->port . "\n";
    echo "Username: " . $ip->username . "\n";
    echo "Provider: " . $ip->provider . "\n";
} else {
    echo "IP Address with ID 7 not found.\n";
}
