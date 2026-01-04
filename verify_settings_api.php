<?php

require __DIR__ . '/vendor/autoload.php';

$app = require __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\User\ProfileSettingsController;

try {
    // Create a test user
    $user = User::create([
        'name' => 'Settings Test User ' . Str::random(5),
        'email' => 'settings_' . Str::random(5) . '@example.com',
        'password' => Hash::make('password'),
    ]);
    
    // Create user details
    $details = UserDetail::create([
        'user_id' => $user->id,
        'first_name' => 'Test',
        'last_name' => 'User',
    ]);

    // Mock authentication
    \Illuminate\Support\Facades\Auth::login($user);
    
    $controller = new ProfileSettingsController();

    // Test Payment Update
    echo "Testing Payment Update...\n";
    $paymentRequest = \App\Http\Requests\User\UpdatePaymentInfoRequest::create('/user/settings/payment', 'PUT', [
        'payment_method' => 'bank',
        'bank_name' => 'Test Bank',
        'account_number' => '1234567890',
        'routing_number' => '0987654321',
    ]);
    $paymentRequest->setContainer($app);
    $paymentRequest->setRedirector($app->make(\Illuminate\Routing\Redirector::class));
    $paymentRequest->validateResolved();
    
    $response = $controller->updatePaymentInfo($paymentRequest);
    $data = $response->getData(true);
    
    if ($data['data']['payment_info']['bank_name'] === 'Test Bank') {
        echo "Payment Update: SUCCESS\n";
    } else {
        echo "Payment Update: FAILED\n";
        print_r($data);
    }

    // Test Notification Update
    echo "Testing Notification Update...\n";
    $notificationRequest = \App\Http\Requests\User\UpdateNotificationPreferencesRequest::create('/user/settings/notifications', 'PUT', [
        'email_new_messages' => true,
        'push_new_messages' => false,
    ]);
    $notificationRequest->setContainer($app);
    $notificationRequest->setRedirector($app->make(\Illuminate\Routing\Redirector::class));
    $notificationRequest->validateResolved();

    $response = $controller->updateNotificationPreferences($notificationRequest);
    $data = $response->getData(true);

    if ($data['data']['notification_preferences']['email_new_messages'] === true &&
        $data['data']['notification_preferences']['push_new_messages'] === false) {
        echo "Notification Update: SUCCESS\n";
    } else {
        echo "Notification Update: FAILED\n";
        print_r($data);
    }

    // Test Privacy Update
    echo "Testing Privacy Update...\n";
    $privacyRequest = \App\Http\Requests\User\UpdatePrivacySettingsRequest::create('/user/settings/privacy', 'PUT', [
        'profile_public' => true,
        'show_email' => false,
    ]);
    $privacyRequest->setContainer($app);
    $privacyRequest->setRedirector($app->make(\Illuminate\Routing\Redirector::class));
    $privacyRequest->validateResolved();

    $response = $controller->updatePrivacySettings($privacyRequest);
    $data = $response->getData(true);

    if ($data['data']['privacy_settings']['profile_public'] === true &&
        $data['data']['privacy_settings']['show_email'] === false) {
        echo "Privacy Update: SUCCESS\n";
    } else {
        echo "Privacy Update: FAILED\n";
        print_r($data);
    }

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
