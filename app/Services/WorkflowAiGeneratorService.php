<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Exception;

class WorkflowAiGeneratorService
{
    protected $baseUrl;
    protected $model;
    protected $apiKeys;
    protected $maxTokens = 8192; // Increased for long-form articles

    public function __construct()
    {
        $this->baseUrl = config('longcat.base_url', 'https://api.longcat.chat/openai/v1/chat/completions');
        $this->model = config('longcat.model', 'LongCat-Flash-Chat');
        $this->apiKeys = config('longcat.api_keys', []);

        if (empty($this->apiKeys)) {
            // Provide a fallback if config not loaded
            $this->apiKeys = [env('LONGCAT_API_KEY', '')];
        }
    }

    /**
     * Clean and parse JSON from AI response, handling truncation and surrounding text.
     */
    protected function extractJson($string)
    {
        if (empty($string)) return null;

        // Strip control characters (fix "Control character error")
        $string = preg_replace('/[\x00-\x1F\x7F]/', '', $string);

        // Find the first { and last }
        $firstBracket = strpos($string, '{');
        $lastBracket = strrpos($string, '}');

        if ($firstBracket === false) return null;

        // If it's truncated (no closing bracket), try to fix it
        if ($lastBracket === false || $lastBracket < $firstBracket) {
            $json = substr($string, $firstBracket);
            // Count open braces to append missing ones
            $openBraces = substr_count($json, '{');
            $closeBraces = substr_count($json, '}');
            $json .= str_repeat('}', max(0, $openBraces - $closeBraces));
            return json_decode($json, true);
        }

        $json = substr($string, $firstBracket, $lastBracket - $firstBracket + 1);
        return json_decode($json, true);
    }

    /**
     * Fetch a valid API key, rotating if the current one has failed.
     */
    protected function getActiveApiKey()
    {
        // We use cache to remember the index of the currently valid key
        $currentIndex = Cache::get('longcat_current_key_index', 0);

        if ($currentIndex >= count($this->apiKeys)) {
            $currentIndex = 0; // Wrap around if out of bounds
        }

        return $this->apiKeys[$currentIndex];
    }

    /**
     * Mark the current API key as failed and move to the next.
     */
    protected function rotateApiKey()
    {
        $currentIndex = Cache::get('longcat_current_key_index', 0);
        $nextIndex = $currentIndex + 1;

        if ($nextIndex >= count($this->apiKeys)) {
            Log::error('All LongCat API keys have been exhausted or failed.');
            throw new Exception('All LongCat API keys are exhausted.');
        }

        Cache::put('longcat_current_key_index', $nextIndex, now()->addHours(24));
        Log::info("Rotated to LongCat API Key index: {$nextIndex}");
    }

    /**
     * Make a request to the LongCat API with automatic retry and key rotation.
     */
    protected function makeApiRequest(array $messages, $retries = 3)
    {
        $payload = [
            'model' => $this->model,
            'messages' => $messages,
            'max_tokens' => $this->maxTokens,
            'temperature' => 0.7
        ];

        while ($retries > 0) {
            $apiKey = $this->getActiveApiKey();

            if (empty($apiKey)) {
                $this->rotateApiKey();
                $retries--;
                continue;
            }

            try {
                $response = Http::withHeaders([
                    'Authorization' => "Bearer {$apiKey}",
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ])->timeout(120)->post($this->baseUrl, $payload);

                if ($response->successful()) {
                    $json = $response->json();
                    return $json['choices'][0]['message']['content'] ?? null;
                }

                // If unauthorized or rate limited, rotate key
                $status = $response->status();
                if ($status === 401 || $status === 403 || $status === 429) {
                    Log::warning("Longcat API failed (HTTP {$status}) with key: " . substr($apiKey, 0, 5) . "...");
                    $this->rotateApiKey();
                    $retries--;
                    continue;
                }

                // Temporary server error, retry without rotation
                if ($status >= 500) {
                    sleep(2);
                    $retries--;
                    continue;
                }

                throw new Exception("API Error: " . $response->body());

            } catch (Exception $e) {
                if (str_contains($e->getMessage(), 'exhausted')) {
                    throw $e;
                }
                
                $retries--;
                if ($retries <= 0) {
                    throw $e;
                }
                sleep(2);
            }
        }

        return null;
    }

    /**
     * Generate content (Blog, Meta, FAQs) for a workflow based on the 3 custom SEO prompts.
     */
    public function generateForWorkflow($workflowTitle, $workflowDescription, $workflowJsonData, $customPrompt = '')
    {
        $topic = "n8n Workflow Automation: {$workflowTitle} - {$workflowDescription}";

        // Prepare context summary of JSON to avoid huge token usage
        $jsonSummary = "";
        if ($workflowJsonData && is_string($workflowJsonData)) {
            $jsonParsed = json_decode($workflowJsonData, true);
            if(isset($jsonParsed['nodes'])) {
                $nodeTypes = array_column($jsonParsed['nodes'], 'type');
                $jsonSummary = implode(", ", array_unique($nodeTypes));
            }
        }

        // STEP 1: SEO Intelligence Data Collection
        $prompt1and2 = "ULTIMATE 2026 AI OVERVIEW + GEO + SEO + ENTITY RANKING MASTER PROMPT BY SAAD SEO\n\n" .
            "Act as a Global SEO Consultant and Senior Technical Content Strategist with 20+ years of experience in building content that ranks across Organic Search, Google AI Overview (SGE), Featured Snippets, People Also Ask, Local Map Pack, Knowledge Panels, and Voice Search.\n\n" .
            "Your task is to act as an SEO Research & Intelligence System for 2026 standards. You must deeply analyze the topic and provide a complete data package that a professional blog writer needs to write a perfectly optimized and ranking-ready article.\n" .
            "TOPIC: {$topic}\n" .
            "Related n8n JSON Node Integrations: {$jsonSummary}\n\n" .
            "Custom User Instructions: {$customPrompt}\n\n" .
            "Target Scope: Global\n" .
            "Target Audience: Mixed (B2B / B2C)\n" .
            "Ranking Priority: All (Organic / AI Overview / Featured Snippets)\n\n" .
            "Provide the complete structured SEO Intelligence package. Include Search Intent Analysis, Keyword Intelligence, AI Overview Triggers, Competitor Intelligence, Entities, Topical Gaps, and Outranking Strategy. DO NOT WRITE THE ARTICLE YET.";

        $messages = [
            ['role' => 'user', 'content' => $prompt1and2]
        ];

        Log::info("Generating SEO Intelligence for: {$workflowTitle}");
        $seoData = $this->makeApiRequest($messages);

        if (!$seoData) {
            throw new Exception("Failed to generate SEO intelligence from LongCat API.");
        }

        // STEP 2: Final Article Generation in JSON format
        $prompt3 = "You are an expert Senior SEO + Editorial Content Writer with 15+ years experience producing ready-to-publish long-form content for high-ranking websites. I am now giving you a full dataset gathered from my previous prompt:\n\n" .
            "=== SEO DATASET ===\n" .
            "{$seoData}\n" .
            "====================\n\n" .
            "Your job now is to generate a ready-to-publish long-form article (1500–2500 words) strictly following instructions.\n" .
            "Ensure the content answers what, why, who, when, how, types, tools, and pricing. Do not use generic AI-style content or disclaimers.\n\n" .
            "FORMATTING INSTRUCTIONS FOR 'article_html':\n" .
            "- The content MUST be professionally formatted using semantic HTML.\n" .
            "- Use <article>, <header>, <hr> for structure.\n" .
            "- Ensure proper visual hierarchy using <h2>, <h3>, <h4>.\n" .
            "- Use bullet points <ul>, <ol> where applicable.\n" .
            "- Display code cleanly inside <pre><code class=\"language-name\">...</code></pre>.\n" .
            "- Build clean CSS-friendly tables (no inline styles like border=\"1\" or cellpadding).\n" .
            "- Do NOT generate huge blocks of unformatted long text. Break it up beautifully.\n\n" .
            "CRITICAL REQUIREMENT: Your output MUST be strictly formatted as a pure JSON object so my automated system can parse it. Do NOT output markdown text outside the JSON block.\n\n" .
            "The JSON structure must be exactly:\n" .
            "{\n" .
            "  \"seo_title\": \"(CTR + Intent optimized title)\",\n" .
            "  \"meta_description\": \"(<= 160 chars)\",\n" .
            "  \"reading_time_minutes\": 5,\n" .
            "  \"suggested_category\": \"(One single concise string, e.g. 'Data Scraping', 'Marketing', 'DevOps')\",\n" .
            "  \"workflow_description_summary\": \"(SGE Short Answer Summary <= 45 words)\",\n" .
            "  \"article_html\": \"(Full semantic HTML formatted 1500+ word article body including <article>, <header>, proper H2/H3, lists, code blocks, and clean tables)\",\n" .
            "  \"faqs\": [\n" .
            "      {\"question\": \"...\", \"answer\": \"...\"},\n" .
            "      {\"question\": \"...\", \"answer\": \"...\"}\n" .
            "  ],\n" .
            "  \"conclusion\": \"(Text conclusion with action steps)\"\n" .
            "}";

        $finalMessages = [
            ['role' => 'user', 'content' => $prompt1and2],
            ['role' => 'assistant', 'content' => $seoData],
            ['role' => 'user', 'content' => $prompt3]
        ];

        Log::info("Generating Final SEO Article for: {$workflowTitle}");
        $finalResponse = $this->makeApiRequest($finalMessages);
        unset($seoData); // Free SEO intelligence as it's no longer needed

        if (!$finalResponse) {
            throw new Exception("Failed to generate final article from LongCat API.");
        }

        $parsedJson = $this->extractJson($finalResponse);
        unset($finalResponse); // Free raw response

        if (!$parsedJson) {
            Log::error("Failed to extract valid JSON from AI response.");
            throw new Exception("AI returned invalid JSON structure.");
        }

        return $parsedJson;
    }
}
