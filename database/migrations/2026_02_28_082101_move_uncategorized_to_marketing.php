<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\WorkflowCategory;
use App\Models\Workflow;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $uncategorized = WorkflowCategory::where('title', 'like', '%uncategorized%')->first();
        
        if ($uncategorized) {
            $marketing = WorkflowCategory::firstOrCreate(
                ['title' => 'Marketing'],
                ['slug' => 'marketing']
            );

            // Move workflows
            Workflow::where('category_id', $uncategorized->id)
                ->update(['category_id' => $marketing->id]);
                
            // Note: intentionally not deleting 'uncategorized' in case it's still needed,
            // but we'll move the relations over.
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // One-way migration
    }
};
