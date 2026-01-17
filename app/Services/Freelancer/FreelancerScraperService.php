<?php

namespace App\Services\Freelancer;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use Psr\Http\Message\ResponseInterface;
use Throwable;

class FreelancerScraperService
{
    public function __construct()
    {
        // Client is now created on demand to support dynamic proxies per user
    }

    /**
     * Get full project by seo_url — NO LOGIN, NO CACHE, WORKS 2025
     */
    public function getProjectBySeoUrl(string $seoUrl): ?array
    {
        if (empty(trim($seoUrl))) {
            return null;
        }

        try {
            $client = $this->getClient();
            
            $response = $client->get('/api/projects/0.1/projects/active', [
                'query' => [
                    'seo_urls'                      => [$seoUrl],
                    'full_description'              => 'true',
                    // 'owner_details'              => 'true', // User URL didn't have this, removing to be exact
                    'owner_info'                    => 'true',
                    'bid_details'                   => 'true',
                    'job_details'                   => 'true',
                    'attachments'                   => 'true',
                    'selected_bids'                 => 'true',
                    'project_upgrades'              => 'true',
                    'qualification_details'         => 'true',
                    'location_details'              => 'true',
                    'nda_details'                   => 'true',
                    'project_collaboration_details' => 'true',
                    'review_availability_details'   => 'true',
                    'local_details'                 => 'true',
                    'equipment_details'             => 'true',
                    'invited_freelancer_details'    => 'true',
                    'client_engagement_details'     => 'true',
                    'contract_signature_details'    => 'true',
                    'enterprise_linked_projects_details' => 'true',
                    'equipment_group_details'       => 'true',
                    'service_offering_details'      => 'true',
                    'webapp'                        => '1',
                    'compact'                       => 'true',
                    'new_errors'                    => 'true',
                    'new_pools'                     => 'true',
                ]
            ]);

            return $this->handleResponse($response, $seoUrl);

        } catch (RequestException $e) {
            $this->logError($seoUrl, $e);
            return null;
        } catch (Throwable $e) {
            Log::critical('FreelancerScraperService unexpected error', [
                'seo_url' => $seoUrl,
                'error'   => $e->getMessage(),
                'trace'   => $e->getTraceAsString()
            ]);
            return null;
        }
    }

    private function getClient(): Client
    {
        $headers = $this->getRandomHeaders();
        
        $options = [
            'base_uri'    => 'https://www.freelancer.com',
            'timeout'     => 60,
            'headers'     => $headers,
            'verify'      => config('app.env') === 'local' ? false : true,
            'http_errors' => false,
        ];

        // Configure Proxy if assigned to authenticated user
        $user = auth()->user();
        if ($user) {
            $ip = \App\Models\IpAddress::where('user_id', $user->id)
                ->where('is_active', true)
                ->first();

            if ($ip) {
                $proxyString = $ip->username && $ip->password
                    ? "{$ip->username}:{$ip->password}@{$ip->ip_address}:{$ip->port}"
                    : "{$ip->ip_address}:{$ip->port}";

                $options['proxy'] = "http://{$proxyString}";
                Log::info("Using assigned proxy for user {$user->id}", ['ip' => $ip->ip_address]);
            } else {
                Log::info("No assigned proxy for user {$user->id}, using direct connection.");
            }
        } else {
            Log::info("No authenticated user, using direct connection.");
        }

        return new Client($options);
    }

    private function getRandomHeaders(): array
    {
        $userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
        ];

        return [
            'User-Agent'       => $userAgents[array_rand($userAgents)],
            'Accept'           => 'application/json, text/plain, */*',
            'Accept-Language'  => 'en-US,en;q=0.9',
            'Referer'          => 'https://www.freelancer.com/',
            'Origin'           => 'https://www.freelancer.com',
            'X-Requested-With' => 'XMLHttpRequest',
            'sec-ch-ua'        => '"Google Chrome";v="131", "Chromium";v="131", "Not=A?Brand";v="24"',
            'sec-ch-ua-mobile' => '?0',
            'sec-ch-ua-platform' => '"Windows"', // Ideally this should match the UA, but keeping it simple for now or randomizing it too if needed.
        ];
    }

    private function handleResponse(ResponseInterface $response, string $seoUrl): ?array
    {
        $status = $response->getStatusCode();

        if ($status !== 200) {
            Log::warning("Freelancer API returned {$status}", [
                'seo_url' => $seoUrl,
                'body'    => substr($response->getBody(), 0, 500)
            ]);
            return null;
        }

        $json = json_decode($response->getBody(), true);

        if (json_last_error() !== JSON_ERROR_NONE || empty($json['result']['projects'][0])) {
            Log::info('Freelancer project not found or private', ['seo_url' => $seoUrl]);
            return null;
        }

        $project = $json['result']['projects'][0];

        // Enrich with detailed client info if available
        // The API response structure for owner_info needs to be preserved or mapped correctly.
        // Based on user request, they want specific fields. We will pass the raw owner_info 
        // and let the controller format it, or format it here. 
        // The controller expects a specific structure. Let's return the raw project data 
        // and handle formatting in the controller to keep this service focused on scraping.
        // However, the previous implementation returned the raw project array, so we stick to that.
        
        return $project;
    }

    private function logError(string $seoUrl, RequestException $e): void
    {
        Log::warning('Freelancer scrape failed', [
            'seo_url' => $seoUrl,
            'error'   => $e->getMessage(),
            'status'  => $e->getResponse()?->getStatusCode(),
            'body'    => $e->getResponse()?->getBody()->getContents()
        ]);
    }
}