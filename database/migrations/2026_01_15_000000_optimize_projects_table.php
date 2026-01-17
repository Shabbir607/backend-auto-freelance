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
        Schema::table('projects', function (Blueprint $table) {
            // Add JSON column for consolidating external/raw data
            $table->json('external_metadata')->nullable()->after('status');

            // Drop redundant or raw data columns
            $table->dropColumn([
                'owner_id',               // Redundant with user_id
                'files',                  // Redundant with project_files table
                'attachments',            // Redundant with project_files table
                'pool_ids',               // Raw API data -> to external_metadata
                'enterprise_ids',         // Raw API data -> to external_metadata
                'bid_stats',              // Raw API data -> to external_metadata
                'upgrades',               // Raw API data -> to external_metadata
                'qualifications',         // Raw API data -> to external_metadata
                'hourly_project_info'     // Raw API data -> to external_metadata
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->unsignedBigInteger('owner_id')->nullable()->after('user_id');
            $table->json('files')->nullable();
            $table->json('attachments')->nullable();
            $table->json('pool_ids')->nullable();
            $table->json('enterprise_ids')->nullable();
            $table->json('bid_stats')->nullable();
            $table->json('upgrades')->nullable();
            $table->json('qualifications')->nullable();
            $table->json('hourly_project_info')->nullable();
            
            $table->dropColumn('external_metadata');
        });
    }
};
