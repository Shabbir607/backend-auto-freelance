<?php

namespace App\Console\Commands;

use App\Models\Workflow;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class FixWorkflowSlugs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflow:fix-slugs {--dry-run : Run without updating the database}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix existing workflow slugs to match title-category format and remove .json extensions.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dryRun = $this->option('dry-run');
        $workflows = Workflow::all();

        $this->info("Found " . $workflows->count() . " workflows to process.");

        $updatedCount = 0;

        foreach ($workflows as $workflow) {
            $oldSlug = $workflow->slug;
            
            // 1. Clean title from .json
            $cleanTitle = str_replace('.json', '', $workflow->title);
            
            // 2. Get category title
            $categoryName = $workflow->category ? $workflow->category->title : 'uncategorized';
            $categorySlugPart = Str::slug($categoryName);

            // 3. Generate new base slug
            $newBaseSlug = Str::slug($cleanTitle) . '-' . $categorySlugPart;
            $newBaseSlug = str_replace('.json', '', $newBaseSlug); // Extra safety

            // 4. Ensure uniqueness
            $newSlug = $this->generateUniqueSlug($newBaseSlug, $workflow->id);

            if ($oldSlug !== $newSlug) {
                $this->line("Workflow ID [{$workflow->id}]: '{$oldSlug}' -> '{$newSlug}'");
                
                if (!$dryRun) {
                    $workflow->update(['slug' => $newSlug]);
                }
                $updatedCount++;
            }
        }

        $this->info("Processed {$workflows->count()} workflows. " . ($dryRun ? "[DRY RUN] " : "") . "Updated {$updatedCount} slugs.");

        return Command::SUCCESS;
    }

    /**
     * Generate a unique slug, ensuring no collisions.
     */
    private function generateUniqueSlug(string $slug, $ignoreId = null): string
    {
        $original = $slug;
        $count = 1;

        while (Workflow::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $original . '-' . $count++;
        }

        return $slug;
    }
}
