<?php

namespace App\Console\Commands;

use App\Jobs\GenerateMetaKeywordsWithAi;
use Illuminate\Console\Command;

class GenerateMetaKeywordsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seo:generate-keywords {--sync : Run the job synchronously (immediately in this terminal without a queue worker)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dispatches the job to generate missing meta keywords for blogs and workflows using AI';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Dispatching GenerateMetaKeywordsWithAi job...');

        if ($this->option('sync')) {
            GenerateMetaKeywordsWithAi::dispatchSync();
            $this->info('Job completed synchronously!');
        } else {
            GenerateMetaKeywordsWithAi::dispatch();
            $this->info('Job dispatched to the queue! (Make sure your queue worker is running)');
        }

        return Command::SUCCESS;
    }
}
