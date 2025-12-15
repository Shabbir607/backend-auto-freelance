<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Store incoming webhook events
        Schema::create('freelancer_webhook_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('platform_account_id')->constrained('platform_accounts')->cascadeOnDelete();
            $table->string('event_type'); // message.sent, thread.updated
            $table->json('payload');
            $table->string('signature')->nullable();
            $table->boolean('processed')->default(false);
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->index(['platform_account_id', 'processed']);
            $table->index('event_type');
        });

        // Cache threads locally
        Schema::create('freelancer_threads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('platform_account_id')->constrained('platform_accounts')->cascadeOnDelete();
            $table->string('freelancer_thread_id')->unique();
            $table->json('participants');
            $table->string('context_type')->nullable(); // project, contest
            $table->unsignedBigInteger('context_id')->nullable();
            $table->timestamp('last_message_at')->nullable();
            $table->boolean('is_archived')->default(false);
            $table->boolean('is_muted')->default(false);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'last_message_at']);
            $table->index('platform_account_id');
        });

        // Cache messages locally
        Schema::create('freelancer_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('freelancer_thread_id')->constrained('freelancer_threads')->cascadeOnDelete();
            $table->string('freelancer_message_id');
            $table->unsignedBigInteger('freelancer_sender_id');
            $table->text('body')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamp('sent_at');
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            // FIX: Shorter unique index name
            $table->unique(
                ['freelancer_thread_id', 'freelancer_message_id'],
                'msg_thread_message_unique'
            );

            $table->index(['freelancer_thread_id', 'sent_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('freelancer_messages');
        Schema::dropIfExists('freelancer_threads');
        Schema::dropIfExists('freelancer_webhook_events');
    }
};
