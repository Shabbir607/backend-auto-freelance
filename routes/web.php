<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Platforms\Freelancer\AuthController;
use App\Http\Controllers\Api\SitemapController;

// API Auth Callback
Route::get('/auth/freelancer', [AuthController::class, 'handleCallback'])->name('freelancer.callback');

// XML Sitemap for SEO Crawlers
Route::get('/sitemap.xml', [SitemapController::class, 'index']);



// API Status
Route::get('/', function () {
    return redirect('https://edgelancer.com/', 301);
});

// Fallback for non-API routes
Route::fallback(function () {
    return redirect('https://edgelancer.com/', 301);
});
;
