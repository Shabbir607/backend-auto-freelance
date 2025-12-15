<?php

namespace App\Services\Fiverr;

use App\Models\PlatformAccount;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use Exception;
use Illuminate\Support\Facades\Log;

class FiverrScraperService
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'timeout' => 30,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ]
        ]);
    }

    /**
     * Scrape Buyer Requests (if available) or Search Jobs
     */
    public function scrapeJobs(PlatformAccount $account, string $url = 'https://www.fiverr.com/users/my_activity/buyer_requests'): array
    {
        $html = $this->fetchPage($account, $url);
        $crawler = new Crawler($html);

        $jobs = [];

        // Example selector for buyer requests table rows (needs actual inspection of Fiverr DOM)
        // This is a placeholder selector structure
        $crawler->filter('table.buyer-requests-table tr')->each(function (Crawler $node) use (&$jobs) {
            try {
                $jobs[] = [
                    'external_id' => $node->attr('data-request-id'),
                    'title' => $node->filter('.request-description')->text(),
                    'budget' => (float) filter_var($node->filter('.budget')->text(), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION),
                    'currency' => 'USD', // Default
                    'posted_at' => now(), // Approximate
                    'offers_count' => (int) $node->filter('.offers-count')->text(),
                ];
            } catch (Exception $e) {
                // Skip malformed rows
            }
        });

        return $jobs;
    }

    /**
     * Fetch page content using session cookies
     */
    protected function fetchPage(PlatformAccount $account, string $url): string
    {
        if (empty($account->session_cookie)) {
            throw new Exception("Fiverr session cookie is missing for account {$account->id}");
        }

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Cookie' => $account->session_cookie,
                    // Add other necessary headers like CSRF if known
                ]
            ]);

            return $response->getBody()->getContents();
        } catch (Exception $e) {
            Log::error("Fiverr Scraper Error: " . $e->getMessage());
            throw $e;
        }
    }
}
