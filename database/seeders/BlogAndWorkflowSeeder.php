<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Workflow;
use App\Models\WorkflowCategory;
use App\Models\User;
use Illuminate\Support\Str;

class BlogAndWorkflowSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first() ?? User::factory()->create(['email' => 'admin@example.com']);

        // --- Blog Categories ---
        $blogCategories = [
            ['title' => 'Automation', 'slug' => 'automation', 'description' => 'Latest trends in freelance automation.'],
            ['title' => 'AI Agents', 'slug' => 'ai-agents', 'description' => 'How to use AI agents for your business.'],
            ['title' => 'Freelance Tips', 'slug' => 'freelance-tips', 'description' => 'Tips and tricks for successful freelancing.'],
        ];

        foreach ($blogCategories as $cat) {
            $category = BlogCategory::create($cat);

            // --- Blogs ---
            for ($i = 1; $i <= 3; $i++) {
                Blog::create([
                    'category_id' => $category->id,
                    'author_id' => $admin->id,
                    'title' => "Sample Blog Post $i for {$category->title}",
                    'slug' => Str::slug("Sample Blog Post $i for {$category->title}"),
                    'description' => "This is a sample description for blog post $i.",
                    'content' => "This is the full content for sample blog post $i in the {$category->title} category. It contains valuable information about automation and AI.",
                    'status' => 'published',
                    'published_at' => now(),
                    'is_featured' => $i === 1,
                    'views' => rand(100, 1000),
                ]);
            }
        }

        // --- Workflow Categories ---
        $workflowCategories = [
            ['title' => 'Marketing', 'slug' => 'marketing', 'icon' => 'lucide-share-2', 'badge_text' => 'Popular'],
            ['title' => 'Sales', 'slug' => 'sales', 'icon' => 'lucide-zap', 'badge_text' => 'New'],
            ['title' => 'Operations', 'slug' => 'operations', 'icon' => 'lucide-settings', 'badge_text' => 'Essential'],
        ];

        foreach ($workflowCategories as $cat) {
            $category = WorkflowCategory::create($cat);

            // --- Workflows ---
            for ($i = 1; $i <= 3; $i++) {
                Workflow::create([
                    'category_id' => $category->id,
                    'title' => "Sample Workflow $i for {$category->title}",
                    'slug' => Str::slug("Sample Workflow $i for {$category->title}"),
                    'description' => "Automate your {$category->title} tasks with this sample workflow $i.",
                    'difficulty' => ['beginner', 'intermediate', 'advanced'][rand(0, 2)],
                    'price' => rand(0, 99),
                    'time_saved_value' => rand(2, 10),
                    'time_saved_unit' => 'hours',
                    'rating' => 4.5 + (rand(0, 5) / 10),
                    'status' => 'published',
                    'views' => rand(50, 500),
                ]);
            }
        }
    }
}
