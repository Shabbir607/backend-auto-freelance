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
        // Fiverr Jobs (Buyer Requests or Gigs)
        Schema::create('fiverr_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->unique(); // Request ID
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->decimal('budget', 10, 2)->nullable();
            $table->string('currency')->default('USD');
            $table->string('buyer_name')->nullable();
            $table->string('duration')->nullable();
            $table->integer('offers_count')->default(0);
            $table->timestamp('posted_at')->nullable();
            $table->timestamps();
        });

        // Fiverr Messages
        Schema::create('fiverr_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('platform_account_id')->constrained('platform_accounts')->cascadeOnDelete();
            $table->string('thread_id')->index();
            $table->string('message_id')->unique();
            $table->string('sender_username');
            $table->text('body')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamp('sent_at');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fiverr_messages');
        Schema::dropIfExists('fiverr_jobs');
    }
};
