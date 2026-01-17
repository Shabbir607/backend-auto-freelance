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

        // Check if user exists
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Please login.'
            ], 401);
        }

        // Allow if user has ANY of the system roles
        if ($user->hasAnyRole(['freelancer', 'client', 'agency', 'admin'])) {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unauthorized. Valid role required.'
        ], 403);

        return $next($request);
    }
}
