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
        // Upwork Jobs
        Schema::create('upwork_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('ciphertext')->unique(); // Upwork's Job ID
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->string('type')->nullable(); // hourly, fixed
            $table->decimal('budget', 10, 2)->nullable();
            $table->string('currency')->default('USD');
            $table->timestamp('posted_at')->nullable();
            $table->json('client_info')->nullable();
            $table->json('skills')->nullable();
            $table->timestamps();
        });

        // Upwork Proposals
        Schema::create('upwork_proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('platform_account_id')->constrained('platform_accounts')->cascadeOnDelete();
            $table->foreignId('upwork_job_id')->constrained('upwork_jobs')->cascadeOnDelete();
            $table->string('status')->default('submitted'); // submitted, active, rejected, archived
            $table->text('cover_letter')->nullable();
            $table->decimal('charge_rate', 10, 2)->nullable();
            $table->string('upwork_proposal_id')->nullable();
            $table->timestamps();
        });

        // Upwork Webhook Events
        Schema::create('upwork_webhook_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('platform_account_id')->constrained('platform_accounts')->cascadeOnDelete();
            $table->string('event_type');
            $table->json('payload');
            $table->boolean('processed')->default(false);
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });

        // Upwork Threads (Rooms)
        Schema::create('upwork_threads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('platform_account_id')->constrained('platform_accounts')->cascadeOnDelete();
            $table->string('room_id')->unique();
            $table->string('application_id')->nullable();
            $table->string('context')->nullable(); // Interview, Offer, etc.
            $table->timestamp('last_message_at')->nullable();
            $table->timestamps();
        });

        // Upwork Messages
        Schema::create('upwork_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('upwork_thread_id')->constrained('upwork_threads')->cascadeOnDelete();
            $table->string('message_id')->unique();
            $table->string('sender_id');
            $table->text('body')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamp('sent_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('upwork_messages');
        Schema::dropIfExists('upwork_threads');
        Schema::dropIfExists('upwork_webhook_events');
        Schema::dropIfExists('upwork_proposals');
        Schema::dropIfExists('upwork_jobs');
    }
};
