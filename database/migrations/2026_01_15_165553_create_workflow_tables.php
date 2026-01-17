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
        // 1. Workflow Categories
        Schema::create('workflow_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->string('badge_text')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Workflow Integrations
        Schema::create('workflow_integrations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->string('url')->nullable();
            $table->timestamps();
        });

        // 3. Workflows (Main Table)
        Schema::create('workflows', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->nullable()->unique(); // For imported workflows (e.g. n8n ID)
            $table->unsignedBigInteger('category_id')->nullable(); // Primary category (for backward compatibility/main display)
            
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('slug')->unique();
            
            // Metrics
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->decimal('price', 10, 2)->default(0.00);
            $table->integer('time_saved_value')->default(0);
            $table->enum('time_saved_unit', ['minutes', 'hours', 'days'])->default('hours');
            $table->integer('roi_percentage')->default(0);
            $table->integer('nodes_count')->default(0);
            $table->integer('user_count')->default(0);
            $table->integer('views')->default(0);
            $table->integer('recent_views')->default(0);
            $table->integer('total_views')->default(0);
            $table->decimal('rating', 3, 2)->default(0.00); 

            // Workflow Definition & Files
            $table->json('json_data')->nullable(); // The automation template content
            $table->string('json_file_name')->nullable();
            $table->string('json_file_path')->nullable();
            
            $table->json('workflow_features')->nullable(); // Array of strings
            $table->json('workflow_nodes')->nullable(); // Array of strings (node names)
            
            $table->enum('status', ['draft', 'published'])->default('draft');
            
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('workflow_categories')->onDelete('set null');
        });

        // 4. Pivot: Workflows <-> Integrations
        Schema::create('workflow_integration_pivot', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('workflow_id');
            $table->unsignedBigInteger('integration_id');
            $table->timestamps();

            $table->foreign('workflow_id')->references('id')->on('workflows')->onDelete('cascade');
            $table->foreign('integration_id')->references('id')->on('workflow_integrations')->onDelete('cascade');
        });

        // 5. Pivot: Workflows <-> Categories (Many-to-Many)
        Schema::create('workflow_category_pivot', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('workflow_id');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();

            $table->foreign('workflow_id')->references('id')->on('workflows')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('workflow_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workflow_category_pivot');
        Schema::dropIfExists('workflow_integration_pivot');
        Schema::dropIfExists('workflows');
        Schema::dropIfExists('workflow_integrations');
        Schema::dropIfExists('workflow_categories');
    }
};
