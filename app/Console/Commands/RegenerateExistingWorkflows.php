<?php

namespace App\Console\Commands;

use App\Jobs\RegenerateWorkflowAiContent;
use App\Models\Workflow;
use Illuminate\Console\Command;

class RegenerateExistingWorkflows extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflow:regenerate-ai-content {--limit= : Number of workflows to process} {--id= : Specific workflow ID to process}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Regenerates AI SEO, Blog, and FAQ content for existing workflows using the latest prompts.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $limit = $this->option('limit');
        $id = $this->option('id');

        $query = Workflow::query();

        if ($id) {
            $query->where('id', $id);
        }

        if ($limit) {
            $query->limit($limit);
        }

        $workflows = $query->get();
        $count = $workflows->count();

        if ($count === 0) {
            $this->info("No workflows found to regenerate.");
            return Command::SUCCESS;
        }

        $this->info("Found {$count} workflows to regenerate. Dispatching jobs...");

        $bar = $this->output->createProgressBar($count);
        $bar->start();

        foreach ($workflows as $workflow) {
            RegenerateWorkflowAiContent::dispatch($workflow->id);
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();

        $this->info("All regeneration jobs have been dispatched to the queue successfully!");

        return Command::SUCCESS;
    }
}
