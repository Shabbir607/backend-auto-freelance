<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Platforms\Freelancer\AuthController;


// API Auth Callback
Route::get('/auth/freelancer', [AuthController::class, 'handleCallback'])->name('freelancer.callback');



// API Status
Route::get('/', function () {
    return response()->json(['status' => 'Nexus AI Freelance Hub API is running']);
});

// Fallback for non-API routes
Route::fallback(function () {
    return response()->json(['message' => 'Not Found'], 404);
});
