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
                    
                    $html = $response->body();
                    
                    // Correcting Domain Exposure: Replace API URL with Frontend URL
                    // This prevents bots from crawling the api. subdomain
                    $frontendHost = parse_url($frontendUrl, PHP_URL_HOST);
                    $currentHost = $request->getHost();
                    
                    if ($frontendHost) {
                        // 1. Replace the current host (api.edgelancer.com usually) with frontend host
                        $html = str_replace($currentHost, $frontendHost, $html);
                        
                        // 2. Explicitly replace api.edgelancer.com just in case it's hardcoded or from different scheme
                        if ($currentHost !== 'api.edgelancer.com') {
                            $html = str_replace('api.edgelancer.com', $frontendHost, $html);
                        }
                    }

                    return response($html)
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
