<?php

namespace App\Jobs;

use App\Models\Blog;
use App\Models\Faq;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use App\Services\WorkflowAiGeneratorService;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RegenerateWorkflowAiContent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $workflowId;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct($workflowId)
    {
        $this->workflowId = $workflowId;
    }

    /**
     * Execute the job.
     */
    public function handle(WorkflowAiGeneratorService $aiService): void
    {
        $workflow = Workflow::find($this->workflowId);

        if (!$workflow) {
            Log::warning("Skipping AI regeneration. Workflow ID {$this->workflowId} not found.");
            return;
        }

        $name = $workflow->title;
        $jsonData = $workflow->json_data;
        $workflowSlug = $workflow->slug;

        Log::info("Starting AI regeneration for existing workflow: {$name} (ID: {$workflow->id})");

        // Generate Content via AI Service
        try {
            $aiData = $aiService->generateForWorkflow($name, 'n8n workflow automation', $jsonData, '', $workflowSlug);
        } catch (\Exception $e) {
            unset($jsonData);
            Log::error("AI Regeneration failed for workflow {$name}: " . $e->getMessage());
            throw $e;
        }

        // Handle Categories cleanly (Update category if AI suggests a better one and current one is generic)
        $category = $workflow->category;
        if ($category && in_array($category->title, ['Marketing', 'Uncategorized']) && !empty($aiData['suggested_category'])) {
             $categoryTitle = trim($aiData['suggested_category']);
             $category = WorkflowCategory::firstOrCreate(
                 ['title' => $categoryTitle],
                 ['slug' => Str::slug($categoryTitle)]
             );
        }

        // Update Workflow fields
        $workflow->update([
             'category_id' => $category->id ?? $workflow->category_id,
             'description' => $aiData['workflow_description_summary'] ?? $workflow->description,
             'meta_title' => substr($aiData['seo_title'] ?? $name, 0, 255),
             'meta_description' => $aiData['meta_description'] ?? ''
        ]);

        unset($jsonData); // Free memory 

        // Update FAQs for workflow
        if (!empty($aiData['faqs']) && is_array($aiData['faqs'])) {
            // Delete old faqs first to keep it clean
            $workflow->faqs()->delete();
            
            foreach ($aiData['faqs'] as $index => $faqItem) {
                if (isset($faqItem['question']) && isset($faqItem['answer'])) {
                    Faq::create([
                        'faqable_id' => $workflow->id,
                        'faqable_type' => Workflow::class,
                        'question' => $faqItem['question'],
                        'answer' => $faqItem['answer'],
                        'sort_order' => $index,
                        'status' => 1
                    ]);
                }
            }
        }

        // Update or Create Blog
        if (!empty($aiData['article_html'])) {
            
            $blogSlug = Str::slug($name) . '-guide';
            $blog = Blog::where('slug', $blogSlug)->first();

            if ($blog) {
                $blog->update([
                    'title' => $aiData['seo_title'] ?? ($name . ' - Complete Guide'),
                    'description' => $aiData['meta_description'] ?? 'Guide on how to automate using ' . $name,
                    'content' => $aiData['article_html'],
                    'meta_title' => substr($aiData['seo_title'] ?? $name, 0, 255),
                    'meta_description' => $aiData['meta_description'] ?? ''
                ]);
            } else {
                $blog = Blog::create([
                    'slug' => $blogSlug,
                    'title' => $aiData['seo_title'] ?? ($name . ' - Complete Guide'),
                    'description' => $aiData['meta_description'] ?? 'Guide on how to automate using ' . $name,
                    'content' => $aiData['article_html'],
                    'category_id' => \App\Models\BlogCategory::firstOrCreate(['title' => 'Automations', 'slug' => 'automations'])->id,
                    'author_id' => \App\Models\User::first()?->id,
                    'meta_title' => substr($aiData['seo_title'] ?? $name, 0, 255),
                    'meta_description' => $aiData['meta_description'] ?? '',
                    'status' => 'published',
                    'published_at' => now(),
                    'is_featured' => 0
                ]);
            }

            // Update FAQs for the blog
            if (!empty($aiData['faqs']) && is_array($aiData['faqs'])) {
                $blog->faqs()->delete();
                foreach ($aiData['faqs'] as $index => $faqItem) {
                    if (isset($faqItem['question']) && isset($faqItem['answer'])) {
                        Faq::create([
                            'faqable_id' => $blog->id,
                            'faqable_type' => Blog::class,
                            'question' => $faqItem['question'],
                            'answer' => $faqItem['answer'],
                            'sort_order' => $index,
                            'status' => 1
                        ]);
                    }
                }
            }
        }

        Log::info("Successfully regenerated and updated AI content for workflow: {$name}");
    }
}
