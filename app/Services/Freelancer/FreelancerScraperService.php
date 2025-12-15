<?php

namespace App\Services\Freelancer;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use Psr\Http\Message\ResponseInterface;
use Throwable;

class FreelancerScraperService
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://www.freelancer.com',
            'timeout'  => 20,
            'headers'  => [
                'User-Agent'       => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
                'Accept'           => 'application/json, text/plain, */*',
                'Accept-Language'  => 'en-US,en;q=0.9',
                'Referer'          => 'https://www.freelancer.com/',
                'Origin'           => 'https://www.freelancer.com',
                'X-Requested-With' => 'XMLHttpRequest',
                'sec-ch-ua'        => '"Google Chrome";v="131", "Chromium";v="131", "Not=A?Brand";v="24"',
                'sec-ch-ua-mobile' => '?0',
                'sec-ch-ua-platform' => '"Windows"',
            ],
            'verify' => config('app.env') === 'local' ? false : true,
            'http_errors' => false,
        ]);
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
            $response = $this->client->get('/api/projects/0.1/projects/active', [
                'query' => [
                    'seo_url'               => $seoUrl,
                    'full_description'      => 'true',
                    'owner_details'         => 'true',
                    'bid_details'           => 'true',
                    'job_details'           => 'true',
                    'attachments'           => 'true',
                    'selected_bids'         => 'true',
                    'project_upgrades'      => 'true',
                    'qualification_details' => 'true',
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

        return $json['result']['projects'][0];
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