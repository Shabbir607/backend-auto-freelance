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
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProcessN8nWorkflowJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $workflowRow;
    protected $customPrompt;
    protected $rowIndex;
    protected $filePath;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(array $workflowRow, string $customPrompt = '', int $rowIndex = 0, string $filePath = '')
    {
        $this->workflowRow = $workflowRow;
        $this->customPrompt = $customPrompt;
        $this->rowIndex = $rowIndex;
        $this->filePath = $filePath;
    }

    /**
     * Execute the job.
     */
    public function handle(WorkflowAiGeneratorService $aiService): void
    {
        $id = $this->workflowRow['ID'] ?? null;
        $name = $this->workflowRow['NAME'] ?? 'Unknown Workflow';
        $views = $this->workflowRow['TOTAL VIEWS'] ?? 0;
        
        $categoriesString = $this->workflowRow['CATEGORIES'] ?? $this->workflowRow['CATEGORY'] ?? $this->workflowRow['KEY CATEGORIES'] ?? 'Uncategorized';
        if (empty(trim($categoriesString))) {
            $categoriesString = 'Uncategorized';
        }

        $jsonUrl = $this->workflowRow['JSON URL'] ?? null;

        if (!$jsonUrl || !$id) {
            Log::warning("Skipping workflow. Missing ID or JSON URL: {$name}");
            return;
        }

        // Fetch JSON from the n8n API
        $response = Http::timeout(60)->get($jsonUrl);
        if (!$response->successful()) {
            throw new Exception("Failed to fetch JSON data for workflow {$name} from {$jsonUrl}");
        }

        $rawResponse = $response->body();
        $jsonData = $rawResponse;
        
        // N8N Official API Support (Nested JSON)
        if (str_contains($jsonUrl, 'api.n8n.io/api/templates/workflows')) {
            $parsed = json_decode($rawResponse, true);
            if (isset($parsed['workflow'])) {
                // Actual workflow JSON is nested
                $jsonData = json_encode($parsed['workflow']['workflow'] ?? $parsed['workflow']);
                // Override metadata from official source if available
                $name = $parsed['workflow']['name'] ?? $name;
                $views = $parsed['workflow']['stats']['totalViews'] ?? $views;
                
                // Extract categories if missing from CSV
                if (!empty($parsed['workflow']['categories']) && is_array($parsed['workflow']['categories'])) {
                    $officialCategories = array_column($parsed['workflow']['categories'], 'name');
                    $categoriesString = implode('|', $officialCategories);
                }
            }
            unset($parsed); // Memory optimization
        }
        unset($rawResponse); // Memory optimization

        // Check deduplication early
        $existingWorkflow = Workflow::where('external_id', $id)->first();
        if ($existingWorkflow && $existingWorkflow->description) {
            // Already processed
            Log::info("Workflow already processed. Skipping AI generation for ID: {$id}");
            unset($jsonData); 
            return;
        }


        // Pre-build the workflow slug to pass to the AI
        $workflowSlug = Str::slug($name) . '-' . $id;

        // Generate Content via AI Service
        try {
            $aiData = $aiService->generateForWorkflow($name, 'n8n workflow automation', $jsonData, $this->customPrompt, $workflowSlug);
        } catch (\Exception $e) {
            unset($jsonData);
            Log::error("AI Generation failed for workflow {$name}: " . $e->getMessage());
            throw $e;
        }

        // Handle Categories
        $firstCategoryName = explode('|', $categoriesString)[0];
        if ((empty(trim($firstCategoryName)) || trim($firstCategoryName) === 'Uncategorized') && !empty($aiData['suggested_category'])) {
            $firstCategoryName = trim($aiData['suggested_category']);
        }
        
        $category = WorkflowCategory::firstOrCreate(
            ['title' => $firstCategoryName],
            ['slug' => Str::slug($firstCategoryName)]
        );

        // Save Workflow
        $workflow = Workflow::updateOrCreate(
            ['external_id' => $id],
            [
                'title' => $name,
                'slug' => Str::slug($name) . '-' . $id,
                'category_id' => $category->id,
                'description' => $aiData['workflow_description_summary'] ?? '',
                'views' => (int)$views,
                'json_data' => $jsonData,
                'json_file_path' => $jsonUrl,
                'status' => 'published',
                'meta_title' => substr($aiData['seo_title'] ?? $name, 0, 255),
                'meta_description' => $aiData['meta_description'] ?? ''
            ]
        );
        unset($jsonData); // Free memory now that it is saved

        // Save FAQs for workflow
        if (!empty($aiData['faqs']) && is_array($aiData['faqs'])) {
            foreach ($aiData['faqs'] as $index => $faqItem) {
                if (isset($faqItem['question']) && isset($faqItem['answer'])) {
                    Faq::updateOrCreate(
                        [
                            'faqable_id' => $workflow->id,
                            'faqable_type' => Workflow::class,
                            'question' => $faqItem['question']
                        ],
                        [
                            'answer' => $faqItem['answer'],
                            'sort_order' => $index,
                            'status' => 1
                        ]
                    );
                }
            }
        }

        // Save Blog
        if (!empty($aiData['article_html'])) {
            $blog = Blog::updateOrCreate(
                ['slug' => Str::slug($name) . '-guide'],
                [
                    'title' => $aiData['seo_title'] ?? ($name . ' - Complete Guide'),
                    'description' => $aiData['meta_description'] ?? 'Guide on how to automate using ' . $name,
                    'content' => $aiData['article_html'],
                    // Assign generic category or first found blog category
                    'category_id' => \App\Models\BlogCategory::firstOrCreate(['title' => 'Automations', 'slug' => 'automations'])->id,
                    'author_id' => \App\Models\User::first()?->id, // Find admin or null
                    'meta_title' => substr($aiData['seo_title'] ?? $name, 0, 255),
                    'meta_description' => $aiData['meta_description'] ?? '',
                    'status' => 'published',
                    'published_at' => now(),
                    'is_featured' => 0
                ]
            );

            // Save FAQs to blog as well if desired (or just link to workflow)
            if (!empty($aiData['faqs']) && is_array($aiData['faqs'])) {
                foreach ($aiData['faqs'] as $index => $faqItem) {
                    if (isset($faqItem['question']) && isset($faqItem['answer'])) {
                        Faq::updateOrCreate(
                            [
                                'faqable_id' => $blog->id,
                                'faqable_type' => Blog::class,
                                'question' => $faqItem['question']
                            ],
                            [
                                'answer' => $faqItem['answer'],
                                'sort_order' => $index,
                                'status' => 1
                            ]
                        );
                    }
                }
            }
        }

        Log::info("Successfully processed n8n workflow and saved AI content for: {$name}");
    }
}
