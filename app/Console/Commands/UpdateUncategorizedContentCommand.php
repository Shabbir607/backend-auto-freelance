<?php

namespace App\Console\Commands;

use App\Jobs\UpdateUncategorizedContentWithAi;
use Illuminate\Console\Command;

class UpdateUncategorizedContentCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seo:update-uncategorized {--sync : Run the job synchronously (immediately in this terminal without a queue worker)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dispatches the job to update uncategorized blogs and workflows using AI';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Dispatching UpdateUncategorizedContentWithAi job...');

        if ($this->option('sync')) {
            UpdateUncategorizedContentWithAi::dispatchSync();
            $this->info('Job completed synchronously!');
        } else {
            UpdateUncategorizedContentWithAi::dispatch();
            $this->info('Job dispatched to the queue! (Make sure your queue worker is running)');
        }

        return Command::SUCCESS;
    }
}
