<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Passport-authenticated user
        $user = $request->user('api');

        // Check if user exists AND has 'user' role via Spatie
        if (!$user || (!$user->hasRole('user') && !$user->hasRole('admin'))) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. User access required.'
            ], 403);
        }

        return $next($request);
    }
}
