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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->nullable(false);
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            // Profile info
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('company_name', 150)->nullable();
            $table->string('job_title', 100)->nullable();
            $table->text('bio')->nullable();
            $table->decimal('hourly_rate', 10, 2)->nullable();
            $table->string('availability')->nullable(); // 'full-time', 'part-time', 'limited', 'not-available'

            // Contact & location
            $table->string('phone_number', 30)->nullable();
            $table->string('address_line1', 255)->nullable();
            $table->string('address_line2', 255)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('postal_code', 30)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('location')->nullable(); // Combined location string if needed

            // Account preferences
            $table->string('avatar_url', 255)->nullable();
            $table->string('timezone', 100)->default('UTC');
            $table->string('language', 10)->default('en');
            $table->json('payment_info')->nullable();
            $table->json('notification_preferences')->nullable();
            $table->json('privacy_settings')->nullable();

            // Login & verification
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip', 45)->nullable();
            $table->timestamp('email_verified_at')->nullable();

            // Social & website
            $table->string('website_url', 255)->nullable();
            $table->string('linkedin_url', 255)->nullable();
            $table->string('facebook_url', 255)->nullable();
            $table->string('twitter_url', 255)->nullable();
            $table->string('github_url')->nullable();

            $table->timestamps();

            // Indexes for filtering
            $table->index('country');
            $table->index('city');
            $table->index('timezone');
            $table->index('language');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
