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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'username')) {
                $table->string('username')->nullable()->after('name');
            }
            if (!Schema::hasColumn('users', 'image')) {
                $table->string('image')->default('backend/image/default.png')->after('email_verified_at');
            }
            if (!Schema::hasColumn('users', 'role')) {
                $table->enum('role', ['company', 'candidate'])->default('candidate')->after('image');
            }
            if (!Schema::hasColumn('users', 'recent_activities_alert')) {
                $table->boolean('recent_activities_alert')->default(true);
            }
            if (!Schema::hasColumn('users', 'job_expired_alert')) {
                $table->boolean('job_expired_alert')->default(true);
            }
            if (!Schema::hasColumn('users', 'new_job_alert')) {
                $table->boolean('new_job_alert')->default(true);
            }
            if (!Schema::hasColumn('users', 'shortlisted_alert')) {
                $table->boolean('shortlisted_alert')->default(true);
            }
            if (!Schema::hasColumn('users', 'status')) {
                $table->boolean('status')->default(true);
            }
            if (!Schema::hasColumn('users', 'is_demo_field')) {
                $table->boolean('is_demo_field')->default(false);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username',
                'image',
                'role',
                'recent_activities_alert',
                'job_expired_alert',
                'new_job_alert',
                'shortlisted_alert',
                'status',
                'is_demo_field',
            ]);
        });
    }
};
