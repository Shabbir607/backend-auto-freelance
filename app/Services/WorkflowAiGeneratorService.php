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
        $nextIndex = ($currentIndex + 1) % count($this->apiKeys);

        Cache::put('longcat_current_key_index', $nextIndex, now()->addHours(24));
        Log::info("Rotated to LongCat API Key index: {$nextIndex}");
        
        return $nextIndex;
    }

    /**
     * Make a request to the LongCat API with automatic retry and key rotation.
     */
    protected function makeApiRequest(array $messages, $retriesPerKey = 2)
    {
        $payload = [
            'model' => $this->model,
            'messages' => $messages,
            'max_tokens' => $this->maxTokens,
            'temperature' => 0.7
        ];

        $keysCount = count($this->apiKeys);
        $keysTried = 0;

        while ($keysTried < $keysCount) {
            $apiKey = $this->getActiveApiKey();
            $currentKeyRetries = $retriesPerKey;

            if (empty($apiKey)) {
                $this->rotateApiKey();
                $keysTried++;
                continue;
            }

            while ($currentKeyRetries >= 0) {
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

                    $status = $response->status();
                    
                    // If unauthorized or rate limited, rotate key immediately and STOP retrying this key
                    if ($status === 401 || $status === 403 || $status === 429) {
                        Log::warning("Longcat API failed (HTTP {$status}) with key: " . substr($apiKey, 0, 8) . "... Rotated.");
                        $this->rotateApiKey();
                        $keysTried++;
                        continue 2; // Break out of inner loop, increment keysTried, and try next key
                    }

                    // Temporary server error, retry on the same key
                    if ($status >= 500 && $currentKeyRetries > 0) {
                        Log::info("Longcat API server error (HTTP {$status}), retrying same key... ({$currentKeyRetries} left)");
                        sleep(2);
                        $currentKeyRetries--;
                        continue;
                    }

                    // For other errors or exhausted retries, log and rotate
                    Log::error("Longcat API request failed (HTTP {$status}): " . $response->body());
                    $this->rotateApiKey();
                    $keysTried++;
                    continue 2;

                } catch (Exception $e) {
                    Log::error("Longcat API Exception: " . $e->getMessage());
                    
                    if ($currentKeyRetries > 0) {
                        sleep(2);
                        $currentKeyRetries--;
                        continue;
                    }
                    
                    $this->rotateApiKey();
                    $keysTried++;
                    continue 2;
                }
            }
        }

        Log::error('All LongCat API keys have been exhausted or failed.');
        throw new Exception('All LongCat API keys are exhausted.');
    }

    /**
     * Generate content (Blog, Meta, FAQs) for a workflow based on the 3 custom SEO prompts.
     */
    public function generateForWorkflow($workflowTitle, $workflowDescription, $workflowJsonData, $customPrompt = '', $workflowSlug = '')
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
        $prompt1and2 = <<<PROMPT
You are a world-class SEO strategist. Your task is to generate a detailed SEO Intelligence Report for an article about an n8n workflow.

**Article Topic:**
- **Title:** {$workflowTitle}
- **Description:** {$workflowDescription}
- **Core Technologies:** {$jsonSummary}
- **User Focus:** {$customPrompt}

**Your Goal:**
Provide all the necessary SEO data for a writer to create an article that will rank #1 on Google.

**Instructions:**
- Analyze the topic and target audience (freelancers, developers, business owners).
- Generate keywords, user questions, and competitor insights.
- Output your report ONLY in the valid JSON format specified below. Do not include any text outside the JSON structure.

**JSON Output Format:**
```json
{
  "search_intent_analysis": {
    "primary_intent": "Informational",
    "user_questions_to_answer": ["What problem does this workflow solve?", "How do I set up this n8n workflow?", "What are the benefits of automating this task?"],
    "target_audience_pain_points": ["Wasting time on manual data entry", "Difficulty connecting different apps", "Lack of technical skills for complex integrations"]
  },
  "keyword_intelligence": {
    "primary_keywords": ["n8n workflow: {$workflowTitle}", "{$workflowTitle} automation"],
    "secondary_keywords": ["n8n template", "how to automate {$workflowTitle}"],
    "long_tail_keywords": ["step-by-step n8n {$workflowTitle} tutorial", "best n8n workflow for small business"],
    "keyword_phrases_for_faqs": ["Is this n8n workflow free?", "Can I customize this automation?"]
  },
  "competitor_intelligence": {
    "competitor_content_gaps": ["Lack of clear, step-by-step instructions", "No pre-built template available", "Poor explanation of the business value"],
    "outranking_strategy": "Create a comprehensive, easy-to-follow guide with a downloadable n8n template, focusing on the practical benefits for freelancers and small businesses."
  },
  "suggested_word_count_range": "1500-2500 words",
  "suggested_internal_links": ["/blog/what-is-n8n", "/templates"]
}
```
PROMPT;

        $messages = [
            ['role' => 'user', 'content' => $prompt1and2]
        ];

        Log::info("Generating SEO Intelligence for: {$workflowTitle}");
        $seoData = $this->makeApiRequest($messages);

        if (!$seoData) {
            throw new Exception("Failed to generate SEO intelligence from LongCat API.");
        }

        $workflowSlug = str_replace('.json', '', $workflowSlug);
        $workflowLinkUrl = config('app.frontend_url', 'https://edgelancer.com') . '/templates/' . $workflowSlug;

        // STEP 2: Final Article Generation in JSON format
        $prompt3 = "**Role:** You are an expert Senior SEO + Editorial Content Writer and Frontend UI/UX Designer, specializing in n8n workflow automation and solutions for freelancers and businesses. Your task is to write a ready-to-publish, long-form article for Edgelancer.com.\n\n" .
            "**Context:** You have been provided with a comprehensive SEO Intelligence Report. Your writing style should be authoritative, helpful, engaging, and slightly informal. The article must provide immense value to the target audience: freelancers, small business owners, developers, and automation enthusiasts.\n\n" .
            "**SEO Intelligence Report (CRITICAL - Use this data extensively):**\n" .
            "```json\n" .
            "{$seoData}\n" .
            "```\n\n" .
            "Article Requirements:\n\n" .
            "1. Length: Aim for the suggested_word_count_range provided in the SEO Intelligence Report.\n" .
            "2. Originality: DO NOT use generic AI-style content, disclaimers, or filler. Write naturally and authoritatively.\n" .
            "3. Value Proposition: Focus on solving the user_questions_to_answer and addressing target_audience_pain_points identified in the SEO data.\n" .
            "4. Keyword Integration: Naturally integrate primary_keywords, secondary_keywords, and long_tail_keywords throughout the article, especially in headings and the introduction.\n" .
            "5. Entities: Ensure key entities are mentioned and explained where relevant.\n" .
            "6. Content Differentiation: Implement the content_differentiation and unique_value_proposition strategies from the SEO data.\n" .
            "7. Internal Linking: Strategically place internal links to other relevant Edgelancer.com pages, using the suggested_internal_links from the SEO data. Ensure anchor text is natural and descriptive.\n" .
            "8. External Linking: Link to 2-3 high-authority, relevant external sources where appropriate (e.g., n8n documentation, industry reports).\n\n" .
            "HTML Formatting Instructions for article_html (CRITICAL - Adhere strictly to these Tailwind CSS classes and structures):\n\n" .
            "- Overall Structure: The article MUST be professionally formatted using modern semantic HTML with Tailwind CSS classes for styling. Break up text into readable sections with distinct visual hierarchy.\n" .
            "- Headings: Use elegant typography.\n" .
            "  - <h2>: `<h2 class=\"text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6\">`\n" .
            "  - <h3>: `<h3 class=\"text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-5\">`\n" .
            "  - <h4>: `<h4 class=\"text-xl font-medium text-gray-700 dark:text-gray-300 mt-6 mb-4\">`\n" .
            "- Paragraphs: Use for main body text. `<p class=\"text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6\">`\n" .
            "- Lists: For bullet points or numbered lists.\n" .
            "  - Unordered List (<ul>): `<ul class=\"space-y-4 text-gray-600 dark:text-gray-400 list-none mb-8\">`\n" .
            "  - List Item (<li>): `<li class=\"flex items-start\">` (Consider adding an SVG checkmark or similar icon for visual appeal within the <li>)\n" .
            "- Cards (Key Takeaways, Pros/Cons, Best Practices): Use for highlighting important information. `<div class=\"bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 my-8\">`\n" .
            "- Code Blocks: For n8n JSON, code snippets, or API examples. `<div class=\"bg-gray-900 rounded-lg p-4 my-6 overflow-x-auto\"><pre><code class=\"text-sm text-green-400\">...</code></pre></div>`\n" .
            "- Tables: For comparisons or structured data. `<table class=\"min-w-full divide-y divide-gray-200 dark:divide-gray-700\">` (Ensure responsive design with parent div if needed).\n" .
            "- Alerts/Notes: For important warnings or tips. `<div class=\"p-4 mb-6 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-800\">`\n" .
            "- **Call to Action (CTA) Card (CRITICAL)**: You MUST include a highly visible, incredibly attractive Call to Action (CTA) card linking to this specific workflow. Place one early in the article (after the introduction/first main section) AND one at the conclusion.\n" .
            "  - Link URL: `{$workflowLinkUrl}`\n" .
            "  - Button HTML: `<a href=\"{$workflowLinkUrl}\" class=\"inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition duration-200\">Install this Workflow Now</a>`\n\n" .
            "Final JSON Output Structure (CRITICAL - Adhere exactly):\n" .
            "{\n" .
            "  \"seo_title\": \"[Compelling, CTR-optimized Title incorporating primary keywords, max 60 chars]\",\n" .
            "  \"meta_description\": \"[Concise, benefit-driven description incorporating primary/secondary keywords, max 160 chars]\",\n" .
            "  \"reading_time_minutes\": [Estimated reading time in minutes, integer],\n" .
            "  \"suggested_category\": \"[One single concise string from Edgelancer.com categories, e.g., 'Data Scraping', 'Marketing Automation', 'AI Integrations']\",\n" .
            "  \"workflow_description_summary\": \"[SGE-optimized short answer summary of the workflow, max 45 words]\",\n" .
            "  \"article_html\": \"[Full, beautifully formatted HTML content with Tailwind CSS classes, including cards, callouts, lists, and the two mandatory CTAs linking to {$workflowLinkUrl}. Ensure all HTML is properly escaped for JSON.]\",\n" .
            "  \"faqs\": [\n" .
            "      {\"question\": \"[Question 1]\", \"answer\": \"[Concise Answer 1]\"},\n" .
            "      {\"question\": \"[Question 2]\", \"answer\": \"[Concise Answer 2]\"}\n" .
            "  ],\n" .
            "  \"conclusion\": \"[Text conclusion summarizing key takeaways, reiterating value, and providing clear next steps/actionable advice. Include a final CTA if not already in article_html.]\"\n" .
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
