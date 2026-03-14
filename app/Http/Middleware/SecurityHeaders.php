<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        
        if (config('app.env') === 'production') {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
            $response->headers->set('Content-Security-Policy', "upgrade-insecure-requests");
        } else {
            // Local Development CSP to allow Vite
            $csp = "default-src 'self' https: data:; " .
                   "script-src 'self' https: 'unsafe-inline' 'unsafe-eval' http://127.0.0.1:5173 http://localhost:5173; " .
                   "style-src 'self' https: 'unsafe-inline' http://127.0.0.1:5173 http://localhost:5173; " .
                   "connect-src 'self' https: ws://127.0.0.1:5173 ws://localhost:5173 http://127.0.0.1:5173 http://localhost:5173 http://127.0.0.1:8000 http://localhost:8000; " .
                   "img-src 'self' https: data: http://127.0.0.1:5173 http://localhost:5173; " .
                   "font-src 'self' https: data: http://127.0.0.1:5173 http://localhost:5173;";
            $response->headers->set('Content-Security-Policy', $csp);
        }
        
        return $response;
    }

}
