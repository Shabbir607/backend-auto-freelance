<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Blog;
use App\Jobs\GenerateWorkflowPreviewJob;

class GenerateWorkflowPreviewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflows:generate-previews {--force : Force regenerate existing images} {--limit= : Limit the number of blogs to process}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scan blogs for n8n workflow URLs, fetch the JSON, and generate a branded preview image';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting workflow preview generation scan...');

        // Find blogs that either don't have an image or we are forcing an update
        $query = Blog::query();
        
        if (!$this->option('force')) {
            $query->whereNull('image');
        }

        if ($limit = $this->option('limit')) {
            $query->limit((int) $limit);
        }

        $blogs = $query->get();

        $count = 0;
        foreach ($blogs as $blog) {
            // Updated regex to find workflow slugs in the content.
            // Matches patterns like /workflows/slug-name or https://.../workflows/slug-name
            if (preg_match('/\/workflows\/([a-z0-9-]+)/i', $blog->content, $matches)) {
                $workflowSlug = $matches[1];
                
                $this->line("Found workflow slug for Blog #{$blog->id}: {$workflowSlug}");
                
                // Dispatch job to queue
                GenerateWorkflowPreviewJob::dispatch($blog->id, $workflowSlug);
                $count++;
            }
        }

        $this->info("Successfully dispatched {$count} workflow generation jobs to the queue.");
        $this->warn("Note: Ensure your queue worker is running (php artisan queue:listen) to process these.");
    }
}
