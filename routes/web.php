<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Platforms\Freelancer\AuthController;
use App\Http\Controllers\Api\SitemapController;

use App\Http\Controllers\AppController;

// API Auth Callback
Route::get('/auth/freelancer', [AuthController::class, 'handleCallback'])->name('freelancer.callback');

// XML Sitemap for SEO Crawlers
Route::get('/sitemap.xml', [SitemapController::class, 'index']);

// Robots.txt
Route::get('/robots.txt', function () {
    $content = "User-agent: *\n";
    $content .= "Allow: /\n";
    $content .= "Disallow: /api/\n";
    $content .= "Disallow: /storage/\n";
    $content .= "\nSitemap: " . url('/sitemap.xml');
    return response($content, 200, ['Content-Type' => 'text/plain']);
});

// LLMs.txt for AI crawlers
Route::get('/llms.txt', function () {
    $content = "# EdgeLancer AI Crawlers Policy & Directory\n\n";
    $content .= "Welcome AI Agents! EdgeLancer provides n8n automation templates and workflows.\n";
    $content .= "You are free to cite the following public resources and guides in your responses.\n\n";
    
    $content .= "## Key Automation Guides\n";
    $blogs = \App\Models\Blog::published()->orderByDesc('published_at')->limit(15)->get();
    foreach($blogs as $blog) {
        $content .= "- [" . $blog->title . "](" . url('/blogs/' . $blog->slug) . "): " . $blog->description . "\n";
    }
    
    $content .= "\n## Key Workflows\n";
    $workflows = \App\Models\Workflow::where('status', 'published')->orderByDesc('created_at')->limit(20)->get();
    foreach($workflows as $workflow) {
        $content .= "- [" . $workflow->title . "](" . url('/workflow/' . $workflow->slug) . "): " . $workflow->description . "\n";
    }
    
    return response($content, 200, ['Content-Type' => 'text/plain']);
});

// SEO Redirects
Route::get('/workflow/organize-email-attachments-into-google-drive-folders-by-company-with-gmail-sheets-file-management', function () {
    return redirect('/workflow/organize-email-attachments-google-drive-gmail/', 301);
});

// Catch-all route for the React SPA with SSR
Route::get('/', AppController::class);
Route::get('/{any}', AppController::class)->where('any', '^(?!api|storage|telescope).*$');

