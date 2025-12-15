<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\User\AuthController as UserAuth;
use App\Http\Controllers\Api\Admin\AuthController as AdminAuth;
use App\Http\Controllers\Api\Admin\PlatformController;
use App\Http\Controllers\Api\Platforms\Freelancer\AuthController;
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

use App\Http\Controllers\Api\User\IpAddressController;
use App\Http\Controllers\Api\IpController;

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


});

// Admin Routes
Route::post('/admin/login', [AdminAuth::class,'login']);

Route::middleware(['auth:api', 'admin'])->group(function() {    Route::post('/admin/logout', [AdminAuth::class,'logout']);
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

    // Auth / OAuth
    Route::get('auth/redirect', [AuthController::class, 'redirectToProvider']);
    Route::get('auth/callback', [AuthController::class, 'handleCallback']);
    // Accounts
    Route::get('accounts', action: [AccountController::class, 'index']); 
    Route::post('accounts', [AccountController::class, 'createAccount']);
    Route::get('accounts/profile', [AccountController::class, 'fetchProfile']);
    Route::put('accounts', [AccountController::class, 'updateAccount']);
    Route::delete('accounts', [AccountController::class, 'deleteAccount']);

    Route::delete('accounts', [AccountController::class, 'deleteAccount']);

});

Route::prefix('upwork/{ip?}')->middleware('auth:api')->group(function () {
    Route::get('auth/redirect', [\App\Http\Controllers\Api\Platforms\Upwork\AuthController::class, 'redirectToProvider']);
    Route::get('auth/callback', [\App\Http\Controllers\Api\Platforms\Upwork\AuthController::class, 'handleCallback']);
});

Route::prefix('freelancer/{platform_slug}/{uuid}/{ip_uuid?}')->middleware(['auth:api'])->group(function () {

    // Projects
    Route::get('/projects', [ProjectController::class, 'listProjects']);
    Route::post('/projects', [ProjectController::class, 'createProject']);
    Route::get('/projects/{projectId}', [ProjectController::class, 'getProject']);

    // Bids
    Route::post('/projects/{projectId}/bid', [BidController::class, 'placeBid']);
    Route::get('/projects/{projectId}/bids', [BidController::class, 'listBids']);

    // Utility
    Route::get('categories', [UtilityController::class, 'categories']);
    Route::get('countries', [UtilityController::class, 'countries']);
    Route::get('currencies', [UtilityController::class, 'currencies']);
});

Route::middleware('auth:api')->prefix('user/ip-addresses')->group(function () {
    
    Route::get('/fetch-webshare-proxies', [IpAddressController::class, 'fetchWebshareProxies']);
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

// routes/api.php
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

// Webhook
Route::post('webhook/freelancer', [WebhookController::class, 'handle']);
Route::get('scrape/{seo_url?}', [FreelancerScraperController::class, 'scrape']);

