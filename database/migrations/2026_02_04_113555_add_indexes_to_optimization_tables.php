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
        // Pages
        Schema::table('pages', function (Blueprint $table) {
            $table->index(['is_active', 'slug']); // Optimize active page lookup
        });

        // FAQs
        Schema::table('faqs', function (Blueprint $table) {
            $table->index(['status', 'sort_order']); // Optimize public FAQ listing
            $table->index(['faqable_type', 'faqable_id', 'status', 'sort_order']); // Optimize entity-specific FAQs
        });

        // Blogs
        Schema::table('blogs', function (Blueprint $table) {
            $table->index(['status', 'published_at']); // Optimize blog listing by date
            $table->index(['slug', 'status']); // Optimize single blog lookup
             $table->index(['category_id', 'status']); // Optimize category filtering
            $table->index('is_featured'); // Optimize featured posts
        });
        
        // Blog Categories
        Schema::table('blog_categories', function (Blueprint $table) {
             $table->index(['is_active', 'sort_order']);
             $table->index(['slug', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'slug']);
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->dropIndex(['status', 'sort_order']);
            $table->dropIndex(['faqable_type', 'faqable_id', 'status', 'sort_order']);
        });

        Schema::table('blogs', function (Blueprint $table) {
            $table->dropIndex(['status', 'published_at']);
            $table->dropIndex(['slug', 'status']);
             $table->dropIndex(['category_id', 'status']);
            $table->dropIndex(['is_featured']);
        });
         Schema::table('blog_categories', function (Blueprint $table) {
             $table->dropIndex(['is_active', 'sort_order']);
             $table->dropIndex(['slug', 'is_active']);
        });
    }
};
