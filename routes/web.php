<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Platforms\Freelancer\AuthController;


// API Auth Callback
Route::get('/auth/freelancer', [AuthController::class, 'handleCallback'])->name('freelancer.callback');



// SPA Fallback
Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
