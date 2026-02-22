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
use App\Http\Controllers\Api\Platforms\Freelancer\FreelancerJobController;
use App\Http\Controllers\Api\Platforms\Freelancer\WebhookController;
use App\Http\Controllers\Api\Platforms\Freelancer\FreelancerScraperController;
use App\Http\Controllers\Api\Platforms\Freelancer\MilestoneController;
use App\Http\Controllers\Api\Admin\AdminChatMonitorController;
use App\Http\Controllers\Api\TeamHub\TeamController;
use App\Http\Controllers\Api\TeamHub\ChannelController;
use App\Http\Controllers\Api\TeamHub\TeamMessageController;
use App\Http\Controllers\Api\TeamHub\DirectMessageController;
use App\Http\Controllers\Api\User\IpAddressController;
use App\Http\Controllers\Api\IpController;
use App\Http\Controllers\Api\User\ProfileSettingsController;
use App\Http\Controllers\Api\Platforms\Freelancer\AccountFilterController;
use App\Http\Controllers\Api\Platforms\Freelancer\ProjectTaskController;
use App\Http\Controllers\Api\Platforms\Freelancer\DailyUpdateController;
use App\Http\Controllers\Api\Platforms\Freelancer\ProjectFileController;
use App\Http\Controllers\Api\Platforms\Freelancer\MeetingController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\Admin\CandidateController;
use App\Http\Controllers\Api\Admin\CompanyController;
use App\Http\Controllers\Api\Admin\JobController;
use App\Http\Controllers\Api\JobBoard\JobPostController;
use App\Http\Controllers\Api\JobBoard\CompanyController as JobBoardCompanyController;
use App\Http\Controllers\Api\JobBoard\CandidateController as JobBoardCandidateController;
use App\Http\Controllers\Api\ProjectManagement\GoogleAuthController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\Recruitment\RecruiterController;
use App\Http\Controllers\Api\Admin\WorkflowCategoryController;
use App\Http\Controllers\Api\Admin\WorkflowIntegrationController;
use App\Http\Controllers\Api\Admin\WorkflowController as AdminWorkflowController;
use App\Http\Controllers\Api\Public\WorkflowLibraryController;
use App\Http\Controllers\Api\Public\BlogController as PublicBlogController;
use App\Http\Controllers\Api\Admin\BlogCategoryController;
use App\Http\Controllers\Api\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Api\Admin\FaqController;
use App\Http\Controllers\Api\Admin\PageController as AdminPageController;
use App\Http\Controllers\Api\Public\PageController as PublicPageController;
use App\Http\Controllers\Api\Public\FaqController as PublicFaqController;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Api\Platforms\Freelancer\ContestController;
use App\Http\Controllers\Api\ProjectManagement\ProjectController as GeneralProjectController;
use App\Http\Controllers\Api\ProjectManagement\ProjectTaskController as GeneralTaskController;
use App\Http\Controllers\Api\ProjectManagement\DailyUpdateController as GeneralUpdateController;
use App\Http\Controllers\Api\ProjectManagement\ProjectFileController as GeneralFileController;
use App\Http\Controllers\Api\ProjectManagement\MeetingController as GeneralMeetingController;
use App\Http\Controllers\Api\ProjectManagement\BidController as GeneralBidController;
use App\Http\Controllers\Api\ProjectManagement\MilestoneController as GeneralMilestoneController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Authentication
Route::post('/register', [UserAuth::class, 'register']);
Route::post('/login', [UserAuth::class, 'login']);
Route::post('/admin/login', [AdminAuth::class, 'login']);

// IP Utilities
Route::get('/ip/generate', [IpController::class, 'generate']);
Route::post('/ip/validate', [IpController::class, 'validateIp']);

// Webhooks
Route::post('webhook/freelancer', [WebhookController::class, 'handle']);
Route::get('web/faqs', [PublicFaqController::class, 'index']);
// Public Scraper
Route::get('/project/details', [FreelancerScraperController::class, 'scrape']);
Route::get('/workflows/stats', [WorkflowLibraryController::class, 'stats']);
Route::post('/workflow/view', [WorkflowLibraryController::class, 'trackView']);
Route::get('/workflow/share', [WorkflowLibraryController::class, 'shareUrl']);

// Public Workflow Library
Route::get('/workflow-library', [WorkflowLibraryController::class, 'index']);
Route::get('/workflow-library/categories', [WorkflowLibraryController::class, 'categories']);
Route::get('/workflow-library/features', [WorkflowLibraryController::class, 'features']);
Route::get('/workflow-library/{slug}', [WorkflowLibraryController::class, 'show']);
Route::get('/workflow-categories', [WorkflowLibraryController::class, 'categoryList']);

Route::get('/workflows', [WorkflowLibraryController::class, 'workflowsByCategory']);

Route::get('/workflow-category/{slug}', [WorkflowLibraryController::class, 'categoryWithWorkflows']);

Route::get('/workflow/{slug}/related', [WorkflowLibraryController::class, 'relevantWorkflows']);
Route::post('/workflow/{slug}/reviews', [WorkflowLibraryController::class, 'storeReview']);
Route::get('/workflow/top-view', [WorkflowLibraryController::class, 'topViewWorkflow']);

// Route::get('/workflow-library/{slug}/deploy', [WorkflowLibraryController::class, 'deploy']); // Optional: secure deploy endpoint

// Public Blog Routes
Route::get('/blogs', [PublicBlogController::class, 'index']);
Route::get('/blogs/categories', [PublicBlogController::class, 'categories']);
Route::get('/blogs/{slug}', [PublicBlogController::class, 'show']);
Route::get('/blog/share', [PublicBlogController::class, 'share']);

// Public Page Routes
Route::get('/page-slugs', [PublicPageController::class, 'slugs']); // Lightweight check
Route::get('/page', [PublicPageController::class, 'show']);

Route::get('/pagebody/{slug}', [PublicPageController::class, 'show']); // Added for frontend compatibility



// Public Language Initialization
Route::get('/public/language-init', [\App\Http\Controllers\Api\Public\LanguageController::class, 'init']);

// Public Contact & Newsletter
Route::post('/contact', [\App\Http\Controllers\Api\Public\ContactMessageController::class, 'store']);
Route::post('/newsletter', [\App\Http\Controllers\Api\Public\NewsletterSubscriberController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Authenticated User Routes (Common)
|--------------------------------------------------------------------------
| Accessible by all authenticated users with 'user' middleware check
*/
Route::middleware(['auth:api', 'user'])->prefix('admin')->group(function () {
    
    // Profile & Auth
    Route::get('/user', [UserAuth::class, 'profile']);
    Route::get('/profile', [UserAuth::class, 'profile']);
    Route::post('/logout', [UserAuth::class, 'logout']);

    // Settings
    Route::prefix('user/settings')->group(function () {
        Route::get('/', [ProfileSettingsController::class, 'show']);
        Route::put('/payment', [ProfileSettingsController::class, 'updatePaymentInfo']);
        Route::put('/notifications', [ProfileSettingsController::class, 'updateNotificationPreferences']);
        Route::put('/privacy', [ProfileSettingsController::class, 'updatePrivacySettings']);
    });

    // Templates (Email & Resume)
    Route::apiResource('templates', TemplateController::class);

    // IP Addresses Management
    Route::prefix('ip-addresses')->group(function () {
        Route::get('/fetch', [IpAddressController::class, 'fetchWebshareProxies']);
        Route::get('/', [IpAddressController::class, 'index']);
        Route::post('/', [IpAddressController::class, 'store']);
        Route::get('/{uuid}', [IpAddressController::class, 'show']);
        Route::put('/{uuid}', [IpAddressController::class, 'update']);
        Route::delete('/{uuid}', [IpAddressController::class, 'destroy']);
    });

    // Team Hub (Chat & Collaboration)
    Route::prefix('/team-hub')->group(function () {
        // Messages
        Route::get('/channels/{uuid}/chat-messages', [TeamMessageController::class, 'index']);
        Route::post('/channels/{uuid}/chat-messages', [TeamMessageController::class, 'store']);
        Route::post('/channels/{uuid}/typing', [TeamMessageController::class, 'typing']);
        Route::post('/channels/{uuid}/read', [TeamMessageController::class, 'markAsRead']);
        Route::post('/messages/{id}/react', [TeamMessageController::class, 'react']);
        Route::delete('/messages/{id}/react', [TeamMessageController::class, 'unreact']);
        Route::get('/messages/{id}/replies', [TeamMessageController::class, 'replies']);

        // Direct Messages
        Route::get('/dms', [DirectMessageController::class, 'index']);
        Route::post('/dms', [DirectMessageController::class, 'store']);

        // Teams
        Route::get('/team', [TeamController::class, 'index']);
        Route::post('/team', [TeamController::class, 'store']);
        Route::post('/team/invite', [TeamController::class, 'inviteMember']);
        Route::post('/team/join', [TeamController::class, 'acceptInvitation']);

        // Channels
        Route::get('/channels', [ChannelController::class, 'index']);
        Route::post('/channels', [ChannelController::class, 'store']);
        Route::put('/channels/{uuid}', [ChannelController::class, 'update']);
        Route::delete('/channels/{uuid}', [ChannelController::class, 'destroy']);
        Route::post('/channels/{uuid}/remove-member', [ChannelController::class, 'removeMember']);
        Route::get('/channels/{uuid}', [ChannelController::class, 'show']);
    });

    // General Project Management (Tasks, Files, Meetings)
    Route::prefix('projects/{project}')->group(function () {
        Route::apiResource('tasks', GeneralTaskController::class);
        Route::post('/updates', [GeneralUpdateController::class, 'store']);
        Route::get('/updates', [GeneralUpdateController::class, 'index']);
        Route::get('/files', [GeneralFileController::class, 'index']);
        Route::post('/files', [GeneralFileController::class, 'store']);
        Route::get('/meetings', [GeneralMeetingController::class, 'index']);
        Route::post('/meetings', [GeneralMeetingController::class, 'store']);
        Route::post('/reorder-tasks', [GeneralTaskController::class, 'reorder']);
        Route::apiResource('bids', GeneralBidController::class);
        Route::apiResource('milestones', GeneralMilestoneController::class);
    });

    // Blog Management
    Route::apiResource('blog-categories', BlogCategoryController::class);
    Route::apiResource('blogs', AdminBlogController::class);

    // Workflow Management
    Route::apiResource('workflow-categories', WorkflowCategoryController::class);
    Route::apiResource('workflow-integrations', WorkflowIntegrationController::class);
    Route::get('workflows/{id}/download', [AdminWorkflowController::class, 'downloadFile']);
    Route::apiResource('workflows', AdminWorkflowController::class);
    Route::apiResource('workflows', AdminWorkflowController::class);

    // FAQ Management
    Route::get('faqs', [FaqController::class, 'index']);
    Route::post('faqs', [FaqController::class, 'store']); 
    Route::get('faqs/{faq}', [FaqController::class, 'show']);
    Route::put('faqs/{faq}', [FaqController::class, 'update']);
    Route::delete('faqs/{faq}', [FaqController::class, 'destroy']);
    // Page Management (SEO & Content)
    Route::apiResource('pages', AdminPageController::class);

    // Contact Messages Management
    Route::get('contact-messages', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'index']);
    Route::get('contact-messages/{id}', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'show']);
    Route::post('contact-messages/{id}/reply', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'reply']);
    Route::delete('contact-messages/{id}', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'destroy']);

    // Newsletter Subscribers Management
    Route::get('newsletter-subscribers', [\App\Http\Controllers\Api\Admin\NewsletterSubscriberController::class, 'index']);
    Route::delete('newsletter-subscribers/{id}', [\App\Http\Controllers\Api\Admin\NewsletterSubscriberController::class, 'destroy']);

    // User Google Calendar Auth
    Route::prefix('auth/google')->group(function () {
        Route::get('/redirect', [GoogleAuthController::class, 'redirect']);
        Route::get('/status', [GoogleAuthController::class, 'status']);
        Route::post('/disconnect', [GoogleAuthController::class, 'disconnect']);
    });
    
    Route::apiResource('appointments', AppointmentController::class);

    Route::apiResource('projects', GeneralProjectController::class); // Base resource

    // Recruitment & Interviews
    Route::prefix('recruitment')->group(function () {
        // Recruiter
        Route::post('/jobs', [RecruiterController::class, 'postJob']);
        Route::get('/jobs/{jobId}/applications', [RecruiterController::class, 'viewApplications']);
        Route::post('/jobs/{jobId}/interview', [RecruiterController::class, 'scheduleInterview']);
        Route::post('/jobs/{jobId}/hire', [RecruiterController::class, 'hireCandidate']);
        
        // Candidate
        Route::post('/jobs/{jobId}/apply', [CandidateController::class, 'applyJob']);
        Route::get('/my-interviews', [CandidateController::class, 'myInterviews']);
    });
});

/*
|--------------------------------------------------------------------------
| Freelancer Platform Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api', 'role:freelancer|agency'])->prefix('freelancer')->group(function () {
    
    // Job Discovery
    Route::get('/jobs', [FreelancerJobController::class, 'listJobs']);
    Route::get('/jobs/search', [FreelancerJobController::class, 'searchJobs']);
    Route::get('/job-bundles', [FreelancerJobController::class, 'jobBundles']);
    Route::get('/job-bundle-categories', [FreelancerJobController::class, 'jobBundleCategories']);
    
    // Projects View
    Route::get('/projects', [FreelancerJobController::class, 'listProjects']);
    Route::get('/projects/{id}', [FreelancerJobController::class, 'getProject']);

    // Messaging
    Route::prefix('messaging')->group(function () {
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

    // Platform-level Account Management (No IP)
    Route::group([], function () {
        Route::get('auth/redirect', [FreelancerAuth::class, 'redirectToProvider']);
        Route::get('auth/callback', [FreelancerAuth::class, 'handleCallback']);
        
        Route::get('accounts', [AccountController::class, 'index']); 
        Route::post('accounts', [AccountController::class, 'createAccount']);
        Route::get('accounts/profile', [AccountController::class, 'fetchProfile']);
        Route::put('accounts', [AccountController::class, 'updateAccount']);
        Route::delete('accounts', [AccountController::class, 'deleteAccount']);
    });

    // IP-level Account Management
    Route::prefix('{platform_slug}/{ip}')->where(['ip' => '[0-9.]+'])->group(function () {
        Route::get('accounts', [AccountController::class, 'index']); 
        Route::post('accounts', [AccountController::class, 'createAccount']);
        Route::get('accounts/profile', [AccountController::class, 'fetchProfile']);
        Route::put('accounts', [AccountController::class, 'updateAccount']);
        Route::delete('accounts', [AccountController::class, 'deleteAccount']);
    });

    // Account-level Scoped Actions (UUID)
    Route::prefix('{platform_slug}/{uuid}')->group(function () {
        // Extended Project Features
        Route::post('/projects/{projectId}/invite', [ProjectController::class, 'inviteFreelancer']);
        Route::get('/projects/fees', [ProjectController::class, 'getUpgradeFees']);
        Route::get('/projects/{projectId}/bidinfo', [ProjectController::class, 'getBidInfo']);
        Route::get('/projects/{projectId}/milestones', [ProjectController::class, 'getMilestones']);
        Route::get('/projects/{projectId}/milestone_requests', [ProjectController::class, 'getMilestoneRequests']);
        Route::get('/hourly_contracts', [ProjectController::class, 'getHourlyContracts']);
        Route::get('/projects/{projectId}/ip_contracts', [ProjectController::class, 'getIpContracts']);

        // Project Actions
        Route::get('/projects', [ProjectController::class, 'listProjects']);
        Route::post('/projects', [ProjectController::class, 'createProject']);
        Route::get('/projects/{projectId}', [ProjectController::class, 'getProject']);
        Route::put('/projects/{projectId}', [ProjectController::class, 'update']);
        Route::delete('/projects/{projectId}', [ProjectController::class, 'destroy']);

        // Contests
        Route::get('/contests', [ContestController::class, 'index']);
        Route::post('/contests', [ContestController::class, 'store']);
        Route::get('/contests/active', [ContestController::class, 'searchActive']);
        Route::get('/contests/all', [ContestController::class, 'searchAll']);
        Route::get('/contests/{contestId}', [ContestController::class, 'show']);
        Route::put('/contests/{contestId}', [ContestController::class, 'update']);

        // Bidding
        Route::post('/projects/{projectId}/bid', [BidController::class, 'placeBid']);
        Route::get('/projects/{projectId}/bids', [BidController::class, 'listBids']);
        Route::get('/bids/fees', [BidController::class, 'getUpgradeFees']);
        Route::get('/bids/{bidId}', [BidController::class, 'show']);

        // Milestones
        Route::get('/milestones', [MilestoneController::class, 'index']);
        Route::post('/milestones', [MilestoneController::class, 'store']);

        // Utilities
        Route::get('/categories', [UtilityController::class, 'categories']);
        Route::get('/countries', [UtilityController::class, 'countries']);
        Route::get('/currencies', [UtilityController::class, 'currencies']);
        Route::get('/timezones', [UtilityController::class, 'timezones']);
        
        // Filters
        Route::get('/filters', [AccountFilterController::class, 'index']);
        Route::post('/filters', [AccountFilterController::class, 'store']);
        Route::post('/filters/demo', [AccountFilterController::class, 'addDemoFilters']);
        Route::put('/filters/{filterId}', [AccountFilterController::class, 'update']);
        Route::delete('/filters/{filterId}', [AccountFilterController::class, 'destroy']);

        // Aggregated
        Route::get('/all-projects', [ProjectController::class, 'listAll']);

        // Extended Account Features
        Route::get('/users/directory', [AccountController::class, 'searchDirectory']);
        Route::get('/users/devices', [AccountController::class, 'getLoginDevices']);
        Route::post('/users/skills', [AccountController::class, 'addUserSkills']);
        Route::put('/users/skills', [AccountController::class, 'setUserSkills']);
        Route::delete('/users/skills', [AccountController::class, 'deleteUserSkills']);

        // Extras
        Route::get('reputations', [AccountController::class, 'reputations']);
        Route::get('portfolios', [AccountController::class, 'portfolios']);
        Route::get('users/search', [AccountController::class, 'searchUsers']);
        Route::get('users/{userId}', [AccountController::class, 'getUser']);
    });

    // Global Categories
    Route::get('/categories', [UtilityController::class, 'categories']);
});

/*
|--------------------------------------------------------------------------
| Job Board Routes (Client/Agency/Freelancer)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api', 'user'])->prefix('job-board')->group(function () {
    Route::apiResource('job-posts', JobPostController::class);
    Route::apiResource('companies', JobBoardCompanyController::class);
    Route::apiResource('candidates', JobBoardCandidateController::class);
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api', 'user'])->group(function () {
    Route::post('/logout', [AdminAuth::class, 'logout']);
    Route::get('/users', [AdminAuth::class, 'listUsers']);
    
    // Management
    Route::apiResource('candidates', CandidateController::class);
    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('jobs', JobController::class);

    // Platforms
    Route::apiResource('platforms', PlatformController::class);
    Route::get('platforms/{uuid}/authorize-url', [PlatformController::class, 'getAuthorizationUrl']);

    // Chat Monitor
    Route::prefix('chat')->group(function () {
        Route::get('/stats', [AdminChatMonitorController::class, 'index']);
        Route::get('/logs', [AdminChatMonitorController::class, 'logs']);
    });



    
});

Route::get('/workflows/file/{name}', function ($name) {
    $filename = "{$name}";
 
    $path = "workflows/{$filename}";

    if (!Storage::disk('public')->exists($path)) {
        return response()->json(['error' => 'File not found'], 404);
    }

    return response(
        Storage::disk('public')->get($path),
        200,
        [
            'Content-Type' => 'application/json',
            'Access-Control-Allow-Origin' => '*',
        ]
    );
});

Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

// Fallback
Route::fallback(function(){
    return response()->json(['message' => 'API Route Not Found'], 404);
});
