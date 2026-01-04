<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\User\AuthController as UserAuth;
use App\Http\Controllers\Api\Admin\AuthController as AdminAuth;
use App\Http\Controllers\Api\Admin\PlatformController;
use App\Http\Controllers\Api\Platforms\Freelancer\AuthController as FreelancerAuth;
use App\Http\Controllers\Api\Platforms\Freelancer\AccountController;
use App\Http\Controllers\Api\Platforms\Freelancer\ProjectController;
use App\Http\Controllers\Api\Platforms\Freelancer\BidController;
use App\Http\Controllers\Api\Platforms\Freelancer\MessagingController;
use App\Http\Controllers\Api\Platforms\Freelancer\ThreadController;
use App\Http\Controllers\Api\Platforms\Freelancer\UtilityController;
use App\Http\Controllers\Api\Platforms\Platforms\FreelancerController;
use App\Http\Controllers\Api\Platforms\Freelancer\FreelancerJobController;
use App\Http\Controllers\Api\Platforms\Freelancer\WebhookController;
use App\Http\Controllers\Api\Platforms\Freelancer\FreelancerScraperController;
use App\Http\Controllers\Api\AiController;
use App\Http\Controllers\Api\Platforms\Freelancer\MilestoneController;
use App\Http\Controllers\Api\Admin\AdminChatMonitorController;
use App\Http\Controllers\Api\TeamHub\TeamController;
use App\Http\Controllers\Api\TeamHub\ChannelController;
use App\Http\Controllers\Api\TeamHub\TeamMessageController;
use App\Http\Controllers\Api\User\IpAddressController;
use App\Http\Controllers\Api\IpController;
use App\Http\Controllers\Api\User\ProfileSettingsController;
use App\Http\Controllers\Api\Platforms\Freelancer\AccountFilterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

// User Routes
Route::post('/register', [UserAuth::class,'register']);
Route::post('/login', [UserAuth::class,'login']);

Route::get('/ip/generate', [IpController::class, 'generate']);
Route::post('/ip/validate', [IpController::class, 'validateIp']);

// Protected User Routes
Route::middleware(['auth:api', 'user'])->group(function() {
    Route::get('/user', [UserAuth::class,'profile']);
    Route::post('/logout', [UserAuth::class,'logout']);
    Route::get('/profile', [UserAuth::class,'profile']);

    // Profile Settings
    Route::get('/user/settings', [ProfileSettingsController::class, 'show']);
    Route::put('/user/settings/payment', [ProfileSettingsController::class, 'updatePaymentInfo']);
    Route::put('/user/settings/notifications', [ProfileSettingsController::class, 'updateNotificationPreferences']);
    Route::put('/user/settings/privacy', [ProfileSettingsController::class, 'updatePrivacySettings']);

});

// Admin Routes
Route::post('/admin/login', [AdminAuth::class,'login']);

Route::middleware(['auth:api', 'admin'])->group(function() {  
    Route::post('/admin/logout', [AdminAuth::class,'logout']);
    Route::get('/admin/users', [AdminAuth::class,'listUsers']);
    //platforms
    Route::get('platforms', [PlatformController::class, 'index']);
    Route::post('platforms', [PlatformController::class, 'store']);
    Route::get('platforms/{uuid}', [PlatformController::class, 'show']);
    Route::put('platforms/{uuid}', [PlatformController::class, 'update']);
    Route::delete('platforms/{uuid}', [PlatformController::class, 'destroy']);
    Route::get('platforms/{uuid}/authorize-url', [PlatformController::class, 'getAuthorizationUrl']);

});

Route::prefix('freelancer/{platform_slug}/{ip?}')->middleware('auth:api')->group(function () {

    // Auth 
    Route::get('auth/redirect', [FreelancerAuth::class, 'redirectToProvider']);
    Route::get('auth/callback', [FreelancerAuth::class, 'handleCallback']);
    // Accounts
    Route::get('accounts', action: [AccountController::class, 'index']); 
    Route::post('accounts', [AccountController::class, 'createAccount']);
    Route::get('accounts/profile', [AccountController::class, 'fetchProfile']);
    Route::put('accounts', [AccountController::class, 'updateAccount']);
    Route::delete('accounts', [AccountController::class, 'deleteAccount']);

});

Route::prefix('freelancer/{platform_slug}/{uuid}/{ip_uuid?}')->middleware(['auth:api'])->group(function () {

    // Projects
    Route::get('/projects', [ProjectController::class, 'listProjects']);
    Route::post('/projects', [ProjectController::class, 'createProject']);
    Route::get('/projects/{projectId}', [ProjectController::class, 'getProject']);
    Route::put('/projects/{projectId}', [ProjectController::class, 'update']);
    Route::delete('/projects/{projectId}', [ProjectController::class, 'destroy']);

    // Bids
    Route::post('/projects/{projectId}/bid', [BidController::class, 'placeBid']);
    Route::get('/projects/{projectId}/bids', [BidController::class, 'listBids']);
    Route::get('/bids/{bidId}', [BidController::class, 'show']);

    // Milestones
    Route::get('/milestones', [MilestoneController::class, 'index']);
    Route::post('/milestones', [MilestoneController::class, 'store']);

    // Utility
    Route::get('/categories', [UtilityController::class, 'categories']);
    Route::get('/countries', [UtilityController::class, 'countries']);
    Route::get('/currencies', [UtilityController::class, 'currencies']);
    
    // Account FiltersError
    Route::get('/filters', [AccountFilterController::class, 'index']);
    Route::post('/filters', [AccountFilterController::class, 'store']);
    Route::post('/filters/demo', [AccountFilterController::class, 'addDemoFilters']);
    Route::put('/filters/{filterId}', [AccountFilterController::class, 'update']);
    Route::delete('/filters/{filterId}', [AccountFilterController::class, 'destroy']);

    // Aggregated Projects
    Route::get('/all-projects', [ProjectController::class, 'listAll']);

    // Account Extras
    Route::get('reputations', [AccountController::class, 'reputations']);
    Route::get('portfolios', [AccountController::class, 'portfolios']);
    Route::get('users/search', [AccountController::class, 'searchUsers']);
    Route::get('users/{userId}', [AccountController::class, 'getUser']);

});
    //categories
    Route::get('/freelancer/categories', [UtilityController::class, 'categories']);


Route::middleware('auth:api')->prefix('ip-addresses')->group(function () {
    
    Route::get('/fetch', [IpAddressController::class, 'fetchWebshareProxies']);
    Route::get('/', [IpAddressController::class, 'index']);
    Route::post('/', [IpAddressController::class, 'store']);
    Route::get('/{uuid}', [IpAddressController::class, 'show']);
    Route::put('/{uuid}', [IpAddressController::class, 'update']);
    Route::delete('/{uuid}', [IpAddressController::class, 'destroy']);
});

Route::middleware('auth:api')->prefix('freelancer')->group(function () {

    Route::get('/jobs', [FreelancerJobController::class, 'listJobs']);

    Route::get('/jobs/search', [FreelancerJobController::class, 'searchJobs']);

    Route::get('/job-bundles', [FreelancerJobController::class, 'jobBundles']);

    Route::get('/job-bundle-categories', [FreelancerJobController::class, 'jobBundleCategories']);
    
    Route::get('/projects', [FreelancerJobController::class, 'listProjects']);
    Route::get('/projects/{id}', [FreelancerJobController::class, 'getProject']);
});

Route::prefix('freelancer/messaging')->middleware('auth:api')->group(function () {
    Route::get('threads', [ThreadController::class, 'listThreads']);
    Route::post('threads', [ThreadController::class, 'createThread']);
    Route::get('threads/{id}', [ThreadController::class, 'getThread']);
    Route::put('threads', [ThreadController::class, 'update']);
    Route::post('threads/{id}/messages', [ThreadController::class, 'sendMessage']);
    Route::post('threads/{id}/typing', [ThreadController::class, 'typing']);
    Route::get('threads/search', [ThreadController::class, 'search']);

    Route::get('threads/{id}/messages', [MessagingController::class, 'listMessages']);
    Route::get('messages/{id}', [MessagingController::class, 'getMessage']);
    Route::get('messages/{id}/{filename}', [MessagingController::class, 'attachmentDownload']);
    Route::get('messages/{id}/attachments/{filename}', [MessagingController::class, 'attachmentUrl']);
    Route::get('messages/{id}/{filename}/thumbnail', [MessagingController::class, 'attachmentThumbnail']);
    Route::get('messages/search', [MessagingController::class, 'search']);
});

// Team Hub 
Route::middleware('auth:api')->prefix('team-hub')->group(function () {
    // Messages
    Route::post('/channels/{uuid}/chat-messages', [TeamMessageController::class, 'store']);
    Route::get('/channels/{uuid}/chat-messages', [TeamMessageController::class, 'index']);
    Route::post('/channels/{uuid}/typing', [TeamMessageController::class, 'typing']);
    Route::post('/channels/{uuid}/read', [TeamMessageController::class, 'markAsRead']);

    // Team
    Route::get('/team', [TeamController::class, 'index']);
    Route::post('/team', [TeamController::class, 'store']);
    Route::post('/team/invite', [TeamController::class, 'inviteMember']);
    Route::post('/team/join', [TeamController::class, 'acceptInvitation']);

    // Channels
    Route::get('/channels', [ChannelController::class, 'index']);
    Route::post('/channels', [ChannelController::class, 'store']);
    Route::get('/channels/{uuid}', [ChannelController::class, 'show']);
});

// Admin Chat Monitor
Route::middleware(['auth:api', 'admin'])->prefix('admin/chat')->group(function () {
    Route::get('/stats', [AdminChatMonitorController::class, 'index']);
    Route::get('/logs', [AdminChatMonitorController::class, 'logs']);
});

// Project Management
Route::middleware('auth:api')->group(function () {
    // Projects
    Route::apiResource('projects', \App\Http\Controllers\Api\ProjectManagement\ProjectController::class);

    // Tasks
    Route::post('projects/{project}/tasks', [\App\Http\Controllers\Api\ProjectManagement\ProjectTaskController::class, 'store']);
    Route::put('projects/{project}/tasks/{task}', [\App\Http\Controllers\Api\ProjectManagement\ProjectTaskController::class, 'update']);
    Route::delete('projects/{project}/tasks/{task}', [\App\Http\Controllers\Api\ProjectManagement\ProjectTaskController::class, 'destroy']);

    // Daily Updates
    Route::post('projects/{project}/updates', [\App\Http\Controllers\Api\ProjectManagement\DailyUpdateController::class, 'store']);

    // Files
    Route::get('projects/{project}/files', [\App\Http\Controllers\Api\ProjectManagement\ProjectFileController::class, 'index']);
    Route::post('projects/{project}/files', [\App\Http\Controllers\Api\ProjectManagement\ProjectFileController::class, 'store']);

    // Meetings
    Route::get('projects/{project}/meetings', [\App\Http\Controllers\Api\ProjectManagement\MeetingController::class, 'index']);
    Route::post('projects/{project}/meetings', [\App\Http\Controllers\Api\ProjectManagement\MeetingController::class, 'store']);
});

// Webhook
Route::post('webhook/freelancer', [WebhookController::class, 'handle']);
Route::get('/project/{seo_url?}', [FreelancerScraperController::class, 'scrape']);  
Route::fallback(function(){
    return response()->json(['message' => 'API Route Not Found'], 404);
});

