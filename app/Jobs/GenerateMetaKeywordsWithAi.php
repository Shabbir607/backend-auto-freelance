<?php

namespace App\Jobs;

use App\Models\Blog;
use App\Models\Workflow;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GenerateMetaKeywordsWithAi implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 3600;

    public function handle()
    {
        Log::info("Starting GenerateMetaKeywordsWithAi Job");

        $this->processBlogs();
        $this->processWorkflows();

        Log::info("Finished GenerateMetaKeywordsWithAi Job");
    }

    protected function processBlogs()
    {
        // Process Blogs where meta_keywords is null or empty
        $blogs = Blog::whereNull('meta_keywords')
            ->orWhere('meta_keywords', '')
            ->get();

        foreach ($blogs as $blog) {
            $this->processModel($blog, 'blog');
        }
    }

    protected function processWorkflows()
    {
        // Process Workflows where meta_keywords is null or empty
        $workflows = Workflow::whereNull('meta_keywords')
            ->orWhere('meta_keywords', '')
            ->get();

        foreach ($workflows as $workflow) {
            $this->processModel($workflow, 'workflow');
        }
    }

    protected function processModel($model, $type)
    {
        Log::info("Processing {$type} ID: {$model->id} for meta keywords");

        $title = $model->title ?? '';
        $metaTitle = $model->meta_title ?? '';
        $metaDescription = $model->meta_description ?? '';
        $content = $type === 'blog' ? $model->content : $model->description;

        // If meta_description is empty, fallback to content
        if (empty(trim($metaDescription)) && !empty($content)) {
            $metaDescription = Str::limit(strip_tags($content), 500);
        }

        // Ensure we have some data
        if (empty(trim($title)) && empty(trim($metaDescription))) {
            Log::warning("Skipping {$type} ID {$model->id} because title and description are empty.");
            return;
        }

$prompt = "You are a world-class SEO strategist specializing in keyword research and on-page optimization. Your goal is to generate the most powerful, ranking-focused keywords for every page.

Page Type: {$type}
Page Heading (H1): {$title}
Meta Title: {$metaTitle}
Meta Description: {$metaDescription}

Analyze all provided text and extract keywords using these strict rules:

1. PRIMARY KEYWORD (1)
   - The single highest-value keyword this page must rank for
   - Must match the core search intent of the page
   - Should have the best balance of search volume vs competition

2. SHORT-TAIL KEYWORDS (2-3)
   - 1-2 word broad terms directly related to the topic
   - High volume, foundational terms

3. LONG-TAIL KEYWORDS (3-4)
   - 3-6 word highly specific phrases
   - Lower competition, higher conversion intent
   - Exactly how a real user would type this into Google

4. LSI KEYWORDS (2-3)
   - Semantically related terms Google associates with this topic
   - Must NOT repeat the primary keyword
   - Support topical authority and content depth

5. QUESTION KEYWORD (1)
   - A natural question phrase starting with how, what, why, when, or which
   - Targets featured snippets and People Also Ask results

Keyword quality rules:
- Every keyword must be directly extractable from or closely related to the provided text
- No generic filler keywords
- No keyword stuffing or repetition
- Prioritize buyer and action intent where relevant
- All keywords must be lowercase

Return ONLY a valid JSON object with no markdown, no code blocks, no extra text:
{
    \"primary_keyword\": \"single most important keyword\",
    \"meta_keywords\": \"keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, keyword7, keyword8, keyword9, keyword10\",
    \"longtail_keywords\": [\"long tail phrase one\", \"long tail phrase two\", \"long tail phrase three\"],
    \"lsi_keywords\": [\"lsi term one\", \"lsi term two\", \"lsi term three\"],
    \"question_keyword\": \"how to do something specific here\",
    \"search_intent\": \"informational|navigational|commercial|transactional\",
    \"keyword_density_targets\": {
        \"primary\": \"use 2-3 times per 1000 words\",
        \"secondary\": \"use 1-2 times per 1000 words\"
    }
}";
        $aiResponse = $this->callLongchatApi($prompt);

        if (!$aiResponse) {
            Log::error("Failed to get AI response for {$type} ID {$model->id}");
            return;
        }

        $json = $this->extractJson($aiResponse);

        if (isset($json['meta_keywords'])) {
            $newKeywords = $json['meta_keywords'];

            // Clean up keywords: ensure it's a comma-separated string without trailing punctuation
            $newKeywords = trim($newKeywords, " \t\n\r\0\x0B.,;");
            
            // Update Model
            $model->meta_keywords = $newKeywords;
            $model->save();

            Log::info("Successfully updated {$type} ID {$model->id}. New Meta Keywords: {$newKeywords}");
        } else {
            Log::error("Invalid JSON format from AI for {$type} ID {$model->id}. Response: {$aiResponse}");
        }
        
        // Sleep to avoid rate limits
        sleep(2);
    }

    protected function callLongchatApi($prompt)
    {
        $baseUrl = config('longcat.base_url', 'https://api.longcat.chat/openai/v1/chat/completions');
        $model = config('longcat.model', 'LongCat-Flash-Chat');
        $apiKeys = config('longcat.api_keys', []);
        
        // Fallback to env if config fails
        $apiKey = !empty($apiKeys) ? $apiKeys[0] : env('LONGCAT_API_KEY', '');

        if (empty($apiKey)) {
            Log::error("No Longcat API key found.");
            return null;
        }

        $payload = [
            'model' => $model,
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.7
        ];

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$apiKey}",
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json'
            ])->timeout(120)->post($baseUrl, $payload);

            if ($response->successful()) {
                return $response->json('choices.0.message.content');
            }

            Log::error("Longcat API Error: " . $response->body());
        } catch (\Exception $e) {
            Log::error("Longcat API Exception: " . $e->getMessage());
        }

        return null;
    }

    protected function extractJson($string)
    {
        if (empty($string)) return null;

        // Strip control characters
        $string = preg_replace('/[\x00-\x1F\x7F]/', '', $string);

        // Find the first { and last }
        $firstBracket = strpos($string, '{');
        $lastBracket = strrpos($string, '}');

        if ($firstBracket === false) return null;

        // If it's truncated (no closing bracket), try to fix it
        if ($lastBracket === false || $lastBracket < $firstBracket) {
            $json = substr($string, $firstBracket);
            $openBraces = substr_count($json, '{');
            $closeBraces = substr_count($json, '}');
            $json .= str_repeat('}', max(0, $openBraces - $closeBraces));
            return json_decode($json, true);
        }

        $json = substr($string, $firstBracket, $lastBracket - $firstBracket + 1);
        return json_decode($json, true);
    }
}
