<?php

namespace App\Console\Commands;

use App\Jobs\ProcessN8nWorkflowJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ImportN8nWorkflowsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'n8n:import-workflows {--file=storage/app/private/n8n-workflows-templates-main/n8n_templates_scraped.csv} {--prompt=} {--limit=0}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import n8n workflows from a CSV file and dispatch AI generation jobs.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePath = base_path($this->option('file'));
        $customPrompt = $this->option('prompt') ?? '';
        $limit = (int) $this->option('limit');

        if (!file_exists($filePath)) {
            $this->error("CSV file not found at: {$filePath}");
            return Command::FAILURE;
        }

        $this->info("Parsing CSV file: {$filePath}");

        $header = null;
        $stats = [
            'total_rows_read' => 0,
            'skipped_header_mismatch' => 0,
            'skipped_invalid_url' => 0,
            'skipped_exists_external_id' => 0,
            'skipped_exists_json_url' => 0,
            'dispatched' => 0,
        ];

        // Increased line length to 0 to read any length and use proper enclosure
        if (($handle = fopen($filePath, 'r')) !== false) {
            while (($row = fgetcsv($handle, 0, ',', '"')) !== false) {
                if (!$header) {
                    // Normalize headers: trim and uppercase for robust matching
                    $header = array_map(function($h) {
                        return strtoupper(trim($h));
                    }, $row);
                    continue;
                }

                $stats['total_rows_read']++;
                $count = $stats['total_rows_read'];

                // If row doesn't match header count, skip
                if (count($header) !== count($row)) {
                    $stats['skipped_header_mismatch']++;
                    continue;
                }

                $workflowData = array_combine($header, $row);

                // Check if already imported in database instead of CSV status
                $externalId = $workflowData['ID'] ?? null;
                $jsonUrl = $workflowData['RAW JSON URL'] ?? $workflowData['JSON URL'] ?? $workflowData['URL'] ?? $workflowData['DIRECT WORKFLOW URL'] ?? $workflowData['WORKFLOW URL'] ?? null;

                if (empty($jsonUrl) || !filter_var($jsonUrl, FILTER_VALIDATE_URL)) {
                    $stats['skipped_invalid_url']++;
                    continue;
                }

                if ($externalId && \App\Models\Workflow::where('external_id', $externalId)->exists()) {
                    $stats['skipped_exists_external_id']++;
                    continue;
                }
                
                if (\App\Models\Workflow::where('json_file_path', $jsonUrl)->exists()) {
                    $stats['skipped_exists_json_url']++;
                    continue;
                }
                // Normalize the URL field for the job
                $workflowData['JSON URL'] = $jsonUrl;

                // Dispatch the Job with row index so it can update the CSV
                ProcessN8nWorkflowJob::dispatch($workflowData, $customPrompt, $count, $filePath)->onQueue('default');
                $stats['dispatched']++;

                if ($limit > 0 && $stats['dispatched'] >= $limit) {
                    break;
                }
            }
            fclose($handle);
        }

        $this->table(
            ['Metric', 'Count'],
            [
                ['Total Rows Read', $stats['total_rows_read']],
                ['Dispatched Jobs', $stats['dispatched']],
                ['Skipped (Header/Row Mismatch)', $stats['skipped_header_mismatch']],
                ['Skipped (Missing/Invalid URL)', $stats['skipped_invalid_url']],
                ['Skipped (Already Exists by ID)', $stats['skipped_exists_external_id']],
                ['Skipped (Already Exists by JSON URL)', $stats['skipped_exists_json_url']],
            ]
        );

        Log::info("n8n:import-workflows finished.", $stats);

        return Command::SUCCESS;
    }
}
