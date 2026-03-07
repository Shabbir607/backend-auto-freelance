<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PrerenderMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $userAgent = $request->header('User-Agent');
        $bots = [
            'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 
            'twitterbot', 'facebookexternalhit', 'linkedinbot', 'embedly', 
            'baiduspider', 'pinterest', 'slackbot', 'vkshare', 'facebot', 
            'outbrain', 'w3c_validator', 'whatsapp', 'discordbot', 
            'telegrambot', 'applebot', 'screaming frog', 'lighthouse'
        ];

        $isBot = false;
        if ($userAgent) {
            foreach ($bots as $bot) {
                if (stripos($userAgent, $bot) !== false) {
                    $isBot = true;
                    Log::info("Prerender Bot Detected: " . $userAgent);
                    break;
                }
            }
        }

        if ($isBot) {
            $frontendUrl = env('FRONTEND_URL', 'https://edgelancer.com');
            $prerenderServerUrl = env('PRERENDER_SERVER_URL', 'http://localhost:3000/render');
            
            // Reconstruct the full frontend URL the bot intended to visit
            $targetUrl = $frontendUrl . $request->getRequestUri();
            Log::info("Prerendering URL: " . $targetUrl);
            
            try {
                $response = Http::timeout(30)->get($prerenderServerUrl, [
                    'url' => $targetUrl
                ]);

                if ($response->successful()) {
                    Log::info("Prerender Successful for: " . $targetUrl);
                    return response($response->body())
                        ->header('Content-Type', 'text/html')
                        ->header('X-Prerendered-By', 'Puppeteer-Laravel');
                } else {
                    Log::warning("Prerender Failed (Status " . $response->status() . ") for: " . $targetUrl);
                }
            } catch (\Exception $e) {
                Log::error("Prerender Error: " . $e->getMessage());
            }
        }

        return $next($request);
    }
}
