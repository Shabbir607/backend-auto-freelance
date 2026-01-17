<?php

use App\Models\PlatformAccount;
use App\Models\IpAddress;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$accounts = PlatformAccount::with('ipAddress')->get();

echo "Found " . $accounts->count() . " accounts.\n";

foreach ($accounts as $account) {
    echo "Account ID: " . $account->id . "\n";
    if ($account->ip) {
        echo "  IP ID: " . $account->ip->id . "\n";
        echo "  IP Address: " . $account->ip->ip_address . "\n";
        echo "  Port: " . $account->ip->port . "\n";
        echo "  Provider: " . $account->ip->provider . "\n";
        echo "  Username: " . $account->ip->username . "\n";
    } else {
        echo "  No IP assigned.\n";
    }
    echo "--------------------------------\n";
}
