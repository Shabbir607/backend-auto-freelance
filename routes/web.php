<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Platforms\Freelancer\AuthController;
use App\Http\Controllers\Api\SitemapController;

// API Auth Callback
Route::get('/auth/freelancer', [AuthController::class, 'handleCallback'])->name('freelancer.callback');

// XML Sitemap for SEO Crawlers
Route::get('/sitemap.xml', [SitemapController::class, 'index']);

// Robots.txt — Block ALL crawlers from the API subdomain
// This prevents api.edgelancer.com from appearing in search engines
Route::get('/robots.txt', function () {
    $content = "User-agent: *\nDisallow: /\n\n# This is the API server. Please visit https://edgelancer.com\nSitemap: https://edgelancer.com/sitemap.xml\n";
    return response($content, 200)->header('Content-Type', 'text/plain');
});

// API Status — Redirect root to frontend
Route::get('/', function () {
    return redirect('https://edgelancer.com/', 301);
});

// Fallback — Preserve path and redirect to correct frontend URL
Route::fallback(function (\Illuminate\Http\Request $request) {
    $frontendUrl = env('FRONTEND_URL', 'https://edgelancer.com');
    $targetUrl = rtrim($frontendUrl, '/') . '/' . ltrim($request->getRequestUri(), '/');
    return redirect($targetUrl, 301);
});
