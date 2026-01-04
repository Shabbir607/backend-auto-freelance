<?php

require __DIR__ . '/vendor/autoload.php';

$app = require __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\UserDetail;
use App\Models\UserSkill;
use App\Models\UserPortfolio;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

// Create a test user
$user = User::create([
    'name' => 'Test User ' . Str::random(5),
    'email' => 'test_' . Str::random(5) . '@example.com',
    'password' => Hash::make('password'),
]);

echo "User created: {$user->id}\n";

// Create user details
$details = UserDetail::create([
    'user_id' => $user->id,
    'first_name' => 'John',
    'last_name' => 'Doe',
    'hourly_rate' => 85.50,
    'availability' => 'full-time',
    'location' => 'San Francisco, CA',
    'github_url' => 'https://github.com/johndoe',
    'payment_info' => ['method' => 'bank', 'bank_name' => 'Chase'],
    'notification_preferences' => ['email' => true, 'push' => false],
    'privacy_settings' => ['public_profile' => true],
]);

echo "User details created: {$details->id}\n";

// Add skills
$user->skills()->create([
    'name' => 'React',
    'level' => 'expert',
]);
$user->skills()->create([
    'name' => 'Laravel',
    'level' => 'advanced',
]);

echo "Skills added: " . $user->skills()->count() . "\n";

// Add portfolio
$user->portfolios()->create([
    'title' => 'E-commerce Site',
    'description' => 'Built with React and Laravel',
    'link_url' => 'https://example.com',
    'is_public' => true,
]);

echo "Portfolio added: " . $user->portfolios()->count() . "\n";

// Verify retrieval
$retrievedUser = User::with(['userDetail', 'skills', 'portfolios'])->find($user->id);

if ($retrievedUser->userDetail->first_name === 'John' &&
    $retrievedUser->skills->count() === 2 &&
    $retrievedUser->portfolios->count() === 1 &&
    $retrievedUser->userDetail->payment_info['method'] === 'bank') {
    echo "VERIFICATION SUCCESSFUL\n";
} else {
    echo "VERIFICATION FAILED\n";
    print_r($retrievedUser->toArray());
}
