<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Services\Freelancer\FreelancerScraperService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class FreelancerScraperController extends Controller
{
    public function __construct(
        private readonly FreelancerScraperService $scraper
    ) {}

    /**
     * POST /api/platforms/freelancer/scrape
     * Body: { "seo_url": "web-development/Company-Site-Creation-Optimisation" }
     */
    public function scrape(Request $request): JsonResponse
    {
        // Rate limiting: 15 requests per minute per IP
        $rateKey = 'freelancer_scrape_' . $request->ip();
        if (RateLimiter::tooManyAttempts($rateKey, 15)) {
            return response()->json([
                'success' => false,
                'message' => 'Too many requests. Please try again in a minute.'
            ], 429);
        }
        RateLimiter::hit($rateKey, 60);

        // Validate input
        $validator = Validator::make($request->all(), [
            'seo_url' => 'required|string|regex:/^[a-zA-Z0-9\-]+\/[a-zA-Z0-9\-]+$/'
        ], [
            'seo_url.required' => 'The seo_url field is required.',
            'seo_url.regex'    => 'Invalid seo_url format. Expected: category/slug'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        $seoUrl = $request->input('seo_url');

        $project = $this->scraper->getProjectBySeoUrl($seoUrl);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found, private, or temporarily unavailable.',
                'seo_url' => $seoUrl
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'project_id'         => $project['id'],
                'title'              => $project['title'],
                'seo_url'            => $project['seo_url'],
                'type'               => $project['type'],
                'status'             => $project['frontend_project_status'],
                'budget'             => $project['budget'],
                'currency'           => $project['currency']['sign'] ?? '₹',
                'posted_at'          => \Carbon\Carbon::createFromTimestamp($project['submitdate'])
                                            ->timezone('UTC')
                                            ->format('Y-m-d H:i:s'),
                'bids_count'         => $project['bid_stats']['bid_count'] ?? 0,
                'average_bid'        => round($project['bid_stats']['bid_avg'] ?? 0, 2),
                'full_description'   => $project['description'] ?? $project['preview_description'],
                'preview_description'=> $project['preview_description'],

                'client' => [
                    'username'    => $project['owner_info']['username'] ?? null,
                    'public_name' => $project['owner_info']['public_name'] ?? null,
                    'reputation'  => $project['owner_info']['reputation'] ?? null,
                ],

                'jobs'        => $project['jobs'] ?? [],
                'attachments' => $project['attachments'] ?? [],
                'upgrades'    => $project['upgrades'],

                'scraped_at'  => now()->toDateTimeString(),
            ]
        ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }
}