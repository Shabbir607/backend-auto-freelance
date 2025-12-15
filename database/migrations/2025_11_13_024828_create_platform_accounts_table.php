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
        Schema::create('platform_accounts', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('platform_id')->constrained('platforms')->cascadeOnDelete();
            $table->foreignId('ip_id')->nullable()->unique()->constrained('ip_addresses')->restrictOnDelete();

            $table->string('account_username', 150);
            $table->string('account_email', 180)->nullable();
            $table->string('external_account_id', 150)->nullable();
            $table->text('oauth_access_token')->nullable();
            $table->text('oauth_refresh_token')->nullable();
            $table->timestamp('token_expires_at')->nullable();
            $table->text('session_cookie')->nullable();

            $table->enum('status', ['active','paused','expired','suspended'])->default('active');
            $table->boolean('verified')->default(false);
            $table->timestamp('last_sync_at')->nullable();
            $table->text('last_error')->nullable();

            $table->timestamps();

            $table->index(['status','user_id','platform_id']);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('platform_accounts');
    }
};
