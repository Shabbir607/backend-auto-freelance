<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PrerenderMiddleware
{
    /**
     * The URIs that should be excluded from prerendering.
     *
     * @var array
     */
    protected $except = [
        'api/*',
        'sitemap.xml',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Don't prerender if it's not a GET request
        if (!$request->isMethod('GET')) {
            return $next($request);
        }

        // Don't prerender if the URL matches an excluded path
        foreach ($this->except as $except) {
            if ($request->is($except)) {
                return $next($request);
            }
        }

        // Only prerender if the user agent is a bot
        $userAgent = strtolower($request->header('User-Agent'));
        
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
                if (str_contains($userAgent, $bot)) {
                    $isBot = true;
                    break;
                }
            }
        }

        if (!$isBot) {
            return $next($request);
        }

        // User is a bot, fetch the prerendered HTML
        $prerenderUrl = env('PRERENDER_SERVER_URL', 'http://localhost:3000/render');
        
        // Construct the target URL on the frontend
        $frontendUrl = rtrim(env('FRONTEND_URL', 'https://edgelancer.com'), '/');
        $path = $request->getRequestUri();
        
        // If the bot somehow hit the API directly (e.g. following a link), 
        // we might need to strip the /api prefix for the frontend mapping.
        // But usually, they hit the frontend domain.
        $targetUrl = $frontendUrl . $path;

        try {
            $response = Http::timeout(40)->get($prerenderUrl, [
                'url' => $targetUrl
            ]);

            if ($response->successful()) {
                return response($response->body(), 200)
                    ->header('Content-Type', 'text/html; charset=UTF-8')
                    ->header('X-Prerendered-By', 'Puppeteer-Laravel');
            }
        } catch (\Exception $e) {
            Log::error('Prerender error for '.$targetUrl.': ' . $e->getMessage());
        }

        return $next($request);
    }
}
