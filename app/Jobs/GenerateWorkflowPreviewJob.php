<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Blog;
use Spatie\Browsershot\Browsershot;
use Intervention\Image\ImageManagerStatic as Image;

class GenerateWorkflowPreviewJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $blogId;
    public $workflowSlug;

    /**
     * Create a new job instance.
     */
    public function __construct($blogId, $workflowSlug)
    {
        $this->blogId = $blogId;
        $this->workflowSlug = $workflowSlug;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Log::info("Starting image generation for Blog #{$this->blogId} from slug: {$this->workflowSlug}");

            // 1. Fetch the Workflow model by slug
            $workflow = \App\Models\Workflow::where('slug', $this->workflowSlug)->first();
            
            if (!$workflow) {
                throw new \Exception("Workflow not found for slug: {$this->workflowSlug}");
            }

            // 2. Get the JSON data (either from column or file)
            $jsonData = null;
            if ($workflow->json_data) {
                $jsonData = is_string($workflow->json_data) ? json_decode($workflow->json_data, true) : $workflow->json_data;
            } elseif ($workflow->json_file_path) {
                // Check if file exists in public storage
                if (Storage::disk('public')->exists($workflow->json_file_path)) {
                    $jsonData = json_decode(Storage::disk('public')->get($workflow->json_file_path), true);
                }
            }

            if (!$jsonData) {
                throw new \Exception("Could not extract valid JSON for workflow slug: {$this->workflowSlug}");
            }

            // 3. Generate a temporary HTML file containing the n8n component with this JSON
            $html = $this->buildPreviewHtml($jsonData, $workflow->title);
            
            // Save it temporarily so Puppeteer can open it
            $tempHtmlPath = storage_path('app/temp_workflow_' . $this->blogId . '.html');
            file_put_contents($tempHtmlPath, $html);

            // 4. Take Screenshot using Spatie Browsershot (Puppeteer)
            if (!is_dir(storage_path('app/public/workflows'))) {
                mkdir(storage_path('app/public/workflows'), 0755, true);
            }

            $screenshotPath = storage_path('app/temp_screenshot_' . $this->blogId . '.png');
            
            // Important: We must wait a few seconds for the Web Components (Shadow DOM) to render inside Puppeteer
            Browsershot::url('file://' . $tempHtmlPath)
                ->windowSize(1200, 800)
                ->deviceScaleFactor(2) // High resolution for premium feel
                ->delay(2500) // Slightly longer wait for data heavy workflows
                ->save($screenshotPath);

            // 5. Apply Edgelancer Watermark (Intervention Image)
            // Note: Intervention 3.x uses different syntax, assuming 2.x for legacy compatibility or common Laravel 11 installs
            $image = \Intervention\Image\Facades\Image::make($screenshotPath);
            
            // Add Logo / Brand Watermark at Bottom Right
            $image->text('© EDGELANCER', $image->width() - 30, $image->height() - 40, function($font) {
                $font->size(32);
                $font->color([255, 255, 255, 0.6]); // White semi-transparent
                $font->align('right');
                $font->valign('bottom');
            });

            // Add Workflow Name at Bottom Left for branding
            $image->text('Workflow: ' . $workflow->title, 30, $image->height() - 40, function($font) {
                $font->size(24);
                $font->color([255, 255, 255, 0.5]);
                $font->align('left');
                $font->valign('bottom');
            });

            // 6. Save the final branded image to public storage
            $fileName = 'workflows/workflow_' . $workflow->slug . '_' . $this->blogId . '.png';
            
            Storage::disk('public')->put($fileName, (string) $image->encode('png'));

            // 7. Update the Blog record with the new image URL
            $blog = Blog::find($this->blogId);
            if ($blog) {
                $blog->image = $fileName;
                $blog->save();
                Log::info("Updated Blog #{$this->blogId} with image: {$fileName}");
            }

            // Clean up temporary files
            @unlink($tempHtmlPath);
            @unlink($screenshotPath);

        } catch (\Exception $e) {
            Log::error("Failed to generate workflow preview for Blog #{$this->blogId} (Slug: {$this->workflowSlug}): " . $e->getMessage());
        }
    }

    /**
     * Build the raw HTML file structure for the browser to render.
     */
    private function buildPreviewHtml(array $workflowData, string $title): string
    {
        $jsonString = json_encode($workflowData);
        $jsonString = htmlspecialchars($jsonString, ENT_QUOTES, 'UTF-8');

        return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js"></script>
    <script src="https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js"></script>
    <style>
        body { margin: 0; padding: 0; background: #ffffff; width: 1200px; height: 800px; overflow: hidden; display: flex; flex-direction: column; font-family: sans-serif; }
        .header { background: linear-gradient(135deg, #1f2937, #111827); padding: 24px 32px; color: white; display: flex; align-items: center; border-bottom: 4px solid #3b82f6; }
        .logo { width: 44px; height: 44px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 24px; margin-right: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
        .brand-text { display: flex; flex-direction: column; }
        .brand { font-size: 28px; font-weight: 800; margin: 0; letter-spacing: 0.5px; }
        .tagline { font-size: 13px; color: #9ca3af; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
        n8n-demo { width: 100%; flex: 1; border: none; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">E</div>
        <div class="brand-text">
            <h1 class="brand">EDGELANCER</h1>
            <span class="tagline">Automated Workflow Solutions</span>
        </div>
    </div>
    <n8n-demo 
        workflow="{$jsonString}" 
        theme="light" 
        tidyup="true"
        frame="false" 
        clicktointeract="false" 
        disableinteractivity="true">
    </n8n-demo>
</body>
</html>
HTML;
    }
}
