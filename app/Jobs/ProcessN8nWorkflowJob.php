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
use Illuminate\Support\Facades\Storage;
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
        
        $categoriesString = $this->workflowRow['CATEGORIES'] ?? $this->workflowRow['CATEGORY'] ?? $this->workflowRow['KEY CATEGORIES'] ?? 'Marketing';
        if (empty(trim($categoriesString)) || strcasecmp(trim($categoriesString), 'Uncategorized') === 0) {
            $categoriesString = 'Marketing';
        }

        $jsonUrl = $this->workflowRow['JSON URL'] ?? null;

        if (!$jsonUrl || !$id) {
            Log::warning("Skipping workflow. Missing ID or JSON URL: {$name}");
            return;
        }

        // ── Fetch JSON from the URL ────────────────────────────────────────────────
        $response = Http::timeout(60)->get($jsonUrl);
        if (!$response->successful()) {
            throw new Exception("Failed to fetch JSON data for workflow {$name} from {$jsonUrl}");
        }

        $rawResponse = $response->body();
        $jsonData    = $rawResponse;   // default: treat body as the workflow JSON
        $recentViews = 0;
        $nodeCount   = 0;
        $nodeTypes   = [];

        // ── n8n Official Templates API: https://api.n8n.io/api/templates/workflows/{id} ──
        if (str_contains($jsonUrl, 'api.n8n.io/api/templates/workflows')) {
            $parsed = json_decode($rawResponse, true);

            if (isset($parsed['workflow'])) {
                $wf = $parsed['workflow'];

                // Override metadata from the official API source
                $name        = $wf['name']        ?? $name;
                $views       = $wf['totalViews']   ?? ($wf['stats']['totalViews'] ?? $views);
                $recentViews = $wf['recentViews']  ?? 0;

                // Extract categories from API if not in CSV
                if (!empty($wf['categories']) && is_array($wf['categories'])) {
                    $officialCategories = array_column($wf['categories'], 'name');
                    $categoriesString = implode('|', $officialCategories);
                }

                // Node metadata from workflowInfo
                $nodeCount = $wf['workflowInfo']['nodeCount'] ?? 0;
                if (!empty($wf['workflowInfo']['nodeTypes']) && is_array($wf['workflowInfo']['nodeTypes'])) {
                    $nodeTypes = array_keys($wf['workflowInfo']['nodeTypes']);
                }

                // Extract the ACTUAL workflow JSON (nodes + connections)
                if (!empty($wf['workflow'])) {
                    $jsonData = json_encode($wf['workflow'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                } else {
                    // workflow.workflow is null — try Template URL ONLY if it's a direct file CDN
                    $candidateTemplate = trim($this->workflowRow['TEMPLATE URL'] ?? '');
                    if (str_contains($candidateTemplate, 'files.manuscdn.com')) {
                        $tfResponse = Http::timeout(30)->get($candidateTemplate);
                        if ($tfResponse->successful()) {
                            $jsonData = $tfResponse->body();
                        }
                    }

                    // If still no usable JSON, skip this row
                    if (empty($jsonData) || $jsonData === 'null') {
                        Log::warning("No workflow JSON available for: {$name} ({$jsonUrl})");
                        return;
                    }
                }

                unset($wf, $parsed);
            }
        }
        unset($rawResponse);

        // ── Save workflow JSON as a file on the server ─────────────────────────────
        $cleanId       = str_replace('.json', '', $id);          // strip .json from ID if present
        $cleanNameSlug = Str::slug(str_replace(['.json', '_'], ['', ' '], $name));
        $jsonFileName  = $cleanNameSlug . '-' . Str::slug($cleanId) . '.json';
        $jsonStorageDir = 'workflows';

        // Ensure directory exists with proper permissions
        $fullStorageDir = storage_path('app/public/' . $jsonStorageDir);
        if (!is_dir($fullStorageDir)) {
            mkdir($fullStorageDir, 0755, true);
        }

        // Write the file
        $fullFilePath    = $fullStorageDir . '/' . $jsonFileName;
        file_put_contents($fullFilePath, $jsonData);
        @chmod($fullFilePath, 0644);

        // Relative path stored in DB (accessible via Storage::url() / asset())
        $jsonFileRelPath = $jsonStorageDir . '/' . $jsonFileName;

        // Check deduplication early
        $existingWorkflow = Workflow::where('external_id', $id)->first();
        if ($existingWorkflow && $existingWorkflow->description) {
            // Already processed
            Log::info("Workflow already processed. Skipping AI generation for ID: {$id}");
            unset($jsonData); 
            return;
        }


        // Final cleanup of name string to remove .json extension and underscores
        $name = str_replace(['.json', '_'], ['', ' '], $name);
        $name = preg_replace('/\s+/', ' ', trim($name));

        // Handle Categories early for slug generation
        $firstCategoryName = explode('|', $categoriesString)[0];
        if (empty(trim($firstCategoryName)) || strcasecmp(trim($firstCategoryName), 'Uncategorized') === 0) {
            $firstCategoryName = 'Marketing';
        }

        // Pre-build the workflow slug to pass to the AI (Title + Category)
        $workflowSlug = Str::slug($name) . '-' . Str::slug($firstCategoryName);
        $workflowSlug = str_replace('.json', '', $workflowSlug);

        // Generate Content via AI Service
        try {
            $aiData = $aiService->generateForWorkflow($name, 'n8n workflow automation', $jsonData, $this->customPrompt, $workflowSlug);
        } catch (\Exception $e) {
            unset($jsonData);
            Log::error("AI Generation failed for workflow {$name}: " . $e->getMessage());
            throw $e;
        }

        // Handle Categories
        // Update category if AI suggests a better one (but we keep the slug consistent with what was passed to AI)
        if (($firstCategoryName === 'Marketing') && !empty($aiData['suggested_category'])) {
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
                'title'            => $name,
                'slug'             => $workflowSlug,
                'category_id'      => $category->id,
                'description'      => $aiData['workflow_description_summary'] ?? '',
                'views'            => (int) $views,
                'recent_views'     => (int) $recentViews,
                'total_views'      => (int) $views,
                'nodes_count'      => (int) $nodeCount,
                'workflow_nodes'   => !empty($nodeTypes) ? $nodeTypes : null,
                'json_data'        => $jsonData,
                'json_file_name'   => $jsonFileName,
                'json_file_path'   => $jsonFileRelPath,
                'status'           => 'published',
                'meta_title'       => substr($aiData['seo_title'] ?? $name, 0, 255),
                'meta_description' => $aiData['meta_description'] ?? '',
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
