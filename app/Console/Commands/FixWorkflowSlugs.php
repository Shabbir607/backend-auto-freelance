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
        $blogs = \App\Models\Blog::all();
        $faqs = \App\Models\Faq::all();

        $this->info("Found " . $workflows->count() . " workflows, " . $blogs->count() . " blogs, and " . $faqs->count() . " FAQs.");

        $updatedSlugsCount = 0;
        
        // Build a cache of current valid slugs to avoid unnecessary lookups
        $validSlugs = $workflows->pluck('slug')->toArray();

        // First pass: Calculate/Fix database slugs and titles
        foreach ($workflows as $workflow) {
            $oldSlug = $workflow->slug;
            $oldTitle = $workflow->title;
            
            // Clean title
            $cleanTitle = str_replace(['.json', '_'], ['', ' '], $oldTitle);
            $cleanTitle = preg_replace('/\s+/', ' ', trim($cleanTitle));

            if ($oldTitle !== $cleanTitle) {
                $this->line("Workflow Title Update [ID {$workflow->id}]: '{$oldTitle}' -> '{$cleanTitle}'");
                if (!$dryRun) {
                    $workflow->update(['title' => $cleanTitle]);
                }
            }

            // Generate clean slug version
            $categoryName = $workflow->category ? $workflow->category->title : 'uncategorized';
            $newBaseSlug = Str::slug($cleanTitle) . '-' . Str::slug($categoryName);
            $newSlug = $this->generateUniqueSlug($newBaseSlug, $workflow->id);

            if ($oldSlug !== $newSlug) {
                $this->line("Workflow Slug Update [ID {$workflow->id}]: '{$oldSlug}' -> '{$newSlug}'");
                if (!$dryRun) {
                    $workflow->update(['slug' => $newSlug]);
                }
                $updatedSlugsCount++;
            }
        }

        // Second pass: Global search and replace in all content fields
        $contentProcessors = [
            'Blog' => [$blogs, ['content']],
            'Workflow' => [$workflows, ['description', 'meta_description', 'json_data']],
            'Faq' => [$faqs, ['answer']],
        ];

        $totalFixedLinks = 0;
        $lookupCache = []; // found_slug => target_slug

        foreach ($contentProcessors as $type => [$models, $fields]) {
            foreach ($models as $model) {
                $updated = false;
                foreach ($fields as $field) {
                    $originalContent = $model->$field;
                    if (empty($originalContent)) continue;

                    $newContent = $originalContent;

                    // Regex to find all /templates/ slugs (handles .json and messy suffixes)
                    // Matches /templates/ followed by any non-whitespace characters until a delimiter like ", ', >, ?, or space
                    if (preg_match_all('/\/templates\/([^\" \'>\?]+)/', $originalContent, $matches)) {
                        foreach (array_unique($matches[1]) as $foundSlug) {
                            $targetSlug = null;

                            if (isset($lookupCache[$foundSlug])) {
                                $targetSlug = $lookupCache[$foundSlug];
                            } else {
                                // 1. Try to find by extracting the zie619 ID part
                                if (str_contains($foundSlug, 'zie619')) {
                                    $extractedId = 'zie619' . Str::after($foundSlug, 'zie619');
                                    $foundWorkflow = Workflow::where('external_id', $extractedId)->first();
                                    if ($foundWorkflow) $targetSlug = $foundWorkflow->slug;
                                }

                                // 2. Fallback: Match by external_id suffix or json_file_path
                                if (!$targetSlug) {
                                    $foundWorkflow = Workflow::where('external_id', 'like', "%{$foundSlug}%")
                                        ->orWhere('json_file_path', 'like', "%{$foundSlug}%")
                                        ->first();
                                    if ($foundWorkflow) $targetSlug = $foundWorkflow->slug;
                                }

                                // 3. Fallback: Word-based matching (Very robust for title-based messy slugs)
                                if (!$targetSlug) {
                                    $cleanName = str_replace(['.json', '-'], ' ', $foundSlug);
                                    $words = explode(' ', $cleanName);
                                    $usefulWords = array_filter($words, fn($w) => strlen($w) > 3 && !in_array(strtolower($w), ['workflow', 'automation', 'template', 'guide']));
                                    
                                    if (!empty($usefulWords)) {
                                        $query = Workflow::query();
                                        foreach ($usefulWords as $word) {
                                            $query->where('title', 'like', "%{$word}%");
                                        }
                                        $match = $query->first();
                                        if ($match) $targetSlug = $match->slug;
                                    }
                                }

                                if ($targetSlug) {
                                    $lookupCache[$foundSlug] = $targetSlug;
                                }
                            }

                            if ($targetSlug && $foundSlug !== $targetSlug) {
                                $this->line("Fixing Link in {$type} [ID {$model->id}]: '{$foundSlug}' -> '{$targetSlug}'");
                                $newContent = str_replace('/templates/' . $foundSlug, '/templates/' . $targetSlug, $newContent);
                                $totalFixedLinks++;
                            }
                        }
                    }

                    if ($newContent !== $originalContent) {
                        $model->$field = $newContent;
                        $updated = true;
                    }
                }

                if ($updated && !$dryRun) {
                    $model->save();
                }
            }
        }

        $this->info(($dryRun ? "[DRY RUN] " : "") . "Updated {$updatedSlugsCount} slugs and fixed {$totalFixedLinks} embedded links.");

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
