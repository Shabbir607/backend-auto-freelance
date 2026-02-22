<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
        {
            Schema::table('workflows', function (Blueprint $table) {
                // Indexes for filtering and sorting
                $table->index(['status', 'created_at']); // Default listing (published + newest)
                $table->index(['status', 'user_count']); // Most popular
                $table->index(['status', 'rating']);     // Highest rated
                $table->index(['status', 'roi_percentage']); // Highest ROI
                $table->index('slug'); // Lookups by slug
                $table->index('title'); // Search by title
                $table->index('category_id'); // Filter by category
            });
        }
    
        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::table('workflows', function (Blueprint $table) {
                $table->dropIndex(['status', 'created_at']);
                $table->dropIndex(['status', 'user_count']);
                $table->dropIndex(['status', 'rating']);
                $table->dropIndex(['status', 'roi_percentage']);
                $table->dropIndex(['slug']);
                $table->dropIndex(['title']);
                $table->dropIndex(['category_id']);
            });
        }
};
