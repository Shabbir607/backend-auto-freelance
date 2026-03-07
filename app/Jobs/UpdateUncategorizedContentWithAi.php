<?php

namespace App\Jobs;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UpdateUncategorizedContentWithAi implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 3600;

    public function handle()
    {
        Log::info("Starting UpdateUncategorizedContentWithAi Job");

        $this->processBlogs();
        $this->processWorkflows();

        Log::info("Finished UpdateUncategorizedContentWithAi Job");
    }

    protected function processBlogs()
    {
        // 1. Process Blogs where slug contains 'uncategor' or category title contains 'uncategor'
        $blogs = Blog::where('slug', 'like', '%uncategor%')
            ->orWhereHas('category', function($q) {
                $q->where('title', 'like', '%uncategor%');
            })
            ->get();

        foreach ($blogs as $blog) {
            $this->processModel($blog, 'blog');
        }
    }

    protected function processWorkflows()
    {
        // 2. Process Workflows
        $workflows = Workflow::where('slug', 'like', '%uncategor%')
            ->orWhereHas('category', function($q) {
                $q->where('title', 'like', '%uncategor%');
            })
            ->get();

        foreach ($workflows as $workflow) {
            $this->processModel($workflow, 'workflow');
        }
    }

    protected function processModel($model, $type)
    {
        Log::info("Processing {$type} ID: {$model->id}");

        $content = $type === 'blog' ? $model->content : $model->description;
        $title = $model->title;

        // Ensure we have some content to work with
        if (empty(trim(strip_tags($content)))) {
            Log::warning("Skipping {$type} ID {$model->id} because content is empty.");
            return;
        }
$prompt = "You are a world-class SEO strategist with deep expertise in on-page optimization, search intent analysis, and Google ranking factors. Your goal is to make every page rank #1 on Google for its target keyword.

I have a {$type} with the following details:
Current Title: {$title}
Content: " . Str::limit(strip_tags($content), 2000) . "

Analyze this content deeply and perform the following tasks:

1. IDENTIFY the single most valuable primary keyword this page should rank for based on search volume, intent match, and competition opportunity.

2. REWRITE the title to:
   - Include the primary keyword naturally within the first 60 characters
   - Trigger click-through with power words (Guide, How to, Best, Step-by-Step, Free, etc.)
   - Match the exact search intent (informational, transactional, or commercial)
   - Be unique, specific, and compelling
   - Never exceed 60 characters

3. WRITE a meta description that:
   - Opens with the primary keyword or a close variant
   - Clearly states the benefit or outcome the user will get
   - Includes a soft call to action
   - Is between 140-155 characters exactly
   - Feels human and natural, not robotic

4. ASSIGN a precise category that:
   - Reflects the core topic cluster this page belongs to
   - Is 1-3 words maximum
   - Matches how real users and Google classify this content type

5. GENERATE an H1 heading that:
   - Is different from the meta title but targets the same keyword
   - Is action-oriented and benefit-driven
   - Is between 40-70 characters

6. LIST 5 secondary keywords this page should naturally include in its content to support the primary keyword ranking.

7. IDENTIFY the search intent of this page:
   - Informational (user wants to learn)
   - Navigational (user wants to find a specific site)
   - Commercial (user is researching before buying)
   - Transactional (user is ready to act)

Return ONLY a valid JSON object with no markdown, no code blocks, no extra text:
{
    \"primary_keyword\": \"most important target keyword\",
    \"title\": \"SEO optimized meta title under 60 chars\",
    \"meta_description\": \"compelling meta description 140-155 chars\",
    \"category\": \"Topic Category\",
    \"h1\": \"Page H1 heading\",
    \"secondary_keywords\": [\"keyword1\", \"keyword2\", \"keyword3\", \"keyword4\", \"keyword5\"],
    \"search_intent\": \"informational|navigational|commercial|transactional\",
    \"slug\": \"seo-friendly-url-slug\"
}";

        $aiResponse = $this->callLongchatApi($prompt);

        if (!$aiResponse) {
            Log::error("Failed to get AI response for {$type} ID {$model->id}");
            return;
        }

        $json = $this->extractJson($aiResponse);

        if (isset($json['title']) || isset($json['h1'])) {
            $newMetaTitle = $json['title'] ?? null;
            $newTitle = $json['h1'] ?? $json['title'] ?? 'Generated Title';
            $newCategoryName = $json['category'] ?? 'Uncategorized';
            $metaDescription = $json['meta_description'] ?? null;
            $slugFromAi = $json['slug'] ?? null;
            
            // Build meta keywords from primary and secondary
            $keywordsList = [];
            if (!empty($json['primary_keyword'])) {
                $keywordsList[] = $json['primary_keyword'];
            }
            if (!empty($json['secondary_keywords']) && is_array($json['secondary_keywords'])) {
                $keywordsList = array_merge($keywordsList, $json['secondary_keywords']);
            }
            $metaKeywords = !empty($keywordsList) ? implode(', ', $keywordsList) : null;

            // Handle Category
            if ($type === 'blog') {
                $categorySlug = Str::slug($newCategoryName);
                if (empty($categorySlug)) $categorySlug = 'uncategorized-' . uniqid();
                
                $category = BlogCategory::firstOrCreate(
                    ['slug' => $categorySlug],
                    ['title' => Str::title($newCategoryName)]
                );
            } else {
                $categorySlug = Str::slug($newCategoryName);
                if (empty($categorySlug)) $categorySlug = 'uncategorized-' . uniqid();

                $category = WorkflowCategory::firstOrCreate(
                    ['slug' => $categorySlug],
                    ['title' => Str::title($newCategoryName)]
                );
            }

            // Update Model
            $model->title = $newTitle;
            if ($newMetaTitle) {
                $model->meta_title = $newMetaTitle;
            }
            if ($metaDescription) {
                $model->meta_description = $metaDescription;
            }
            if ($metaKeywords) {
                $model->meta_keywords = $metaKeywords;
            }
            
            $model->category_id = $category->id;
            
            // Generate a fresh unique slug
            $newSlug = $slugFromAi ? Str::slug($slugFromAi) : Str::slug($newTitle);
            
            // Check for duplicate slugs
            $count = 1;
            $originalSlug = $newSlug;
            while ($this->slugExists($newSlug, $type, $model->id)) {
                $newSlug = $originalSlug . '-' . $count;
                $count++;
            }
            
            $model->slug = $newSlug;
            $model->save();

            Log::info("Successfully updated {$type} ID {$model->id}. New Title: {$newTitle}, New Slug: {$newSlug}, New Category: {$category->title}");
        } else {
            Log::error("Invalid JSON format from AI for {$type} ID {$model->id}. Response: {$aiResponse}");
        }
        
        // Sleep to avoid rate limits
        sleep(2);
    }
    
    protected function slugExists($slug, $type, $excludeId)
    {
        if ($type === 'blog') {
            return Blog::where('slug', $slug)->where('id', '!=', $excludeId)->exists();
        } else {
            return Workflow::where('slug', $slug)->where('id', '!=', $excludeId)->exists();
        }
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
