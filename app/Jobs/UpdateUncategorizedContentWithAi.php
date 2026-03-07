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

        $prompt = "You are an expert SEO assistant. I have a {$type} that is currently uncategorized or has a generic title.
Here is the current title: {$title}
Here is the content/description: " . Str::limit(strip_tags($content), 2000) . "

Generate a highly engaging, SEO-optimized title and a concise, fitting category name for this {$type}.
Return ONLY a valid JSON object in this exact format, with no markdown formatting or extra text:
{
    \"title\": \"Your New Title Here\",
    \"category\": \"Your New Category Here\"
}";

        $aiResponse = $this->callLongchatApi($prompt);

        if (!$aiResponse) {
            Log::error("Failed to get AI response for {$type} ID {$model->id}");
            return;
        }

        $json = $this->extractJson($aiResponse);

        if (isset($json['title']) && isset($json['category'])) {
            $newTitle = $json['title'];
            $newCategoryName = $json['category'];

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
            $model->category_id = $category->id;
            
            // Generate a fresh unique slug
            $newSlug = Str::slug($newTitle);
            
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
