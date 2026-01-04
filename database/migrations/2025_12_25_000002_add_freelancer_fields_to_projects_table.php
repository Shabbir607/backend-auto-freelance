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
            $table->unsignedBigInteger('freelancer_project_id')->nullable()->unique()->after('id');
            $table->unsignedBigInteger('owner_id')->nullable()->after('user_id'); // Freelancer owner ID
            $table->string('seo_url')->nullable();
            $table->json('currency')->nullable();
            $table->integer('submitdate')->nullable();
            $table->text('preview_description')->nullable();
            $table->boolean('deleted')->default(false);
            $table->boolean('nonpublic')->default(false);
            $table->boolean('hidebids')->default(false);
            $table->string('type')->nullable(); // fixed/hourly
            $table->integer('bidperiod')->nullable();
            $table->json('hourly_project_info')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('urgent')->default(false);
            $table->json('bid_stats')->nullable();
            $table->integer('time_submitted')->nullable();
            $table->integer('time_updated')->nullable();
            $table->json('upgrades')->nullable();
            $table->json('qualifications')->nullable();
            $table->string('language')->nullable();
            $table->json('attachments')->nullable();
            $table->boolean('hireme')->default(false);
            $table->string('frontend_project_status')->nullable();
            $table->json('location')->nullable();
            $table->boolean('local')->default(false);
            $table->boolean('negotiated')->default(false);
            $table->integer('time_free_bids_expire')->nullable();
            $table->json('files')->nullable();
            $table->json('pool_ids')->nullable();
            $table->json('enterprise_ids')->nullable();
            $table->boolean('is_escrow_project')->default(false);
            $table->boolean('is_seller_kyc_required')->default(false);
            $table->boolean('is_buyer_kyc_required')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'freelancer_project_id',
                'owner_id',
                'seo_url',
                'currency',
                'submitdate',
                'preview_description',
                'deleted',
                'nonpublic',
                'hidebids',
                'type',
                'bidperiod',
                'hourly_project_info',
                'featured',
                'urgent',
                'bid_stats',
                'time_submitted',
                'time_updated',
                'upgrades',
                'qualifications',
                'language',
                'attachments',
                'hireme',
                'frontend_project_status',
                'location',
                'local',
                'negotiated',
                'time_free_bids_expire',
                'files',
                'pool_ids',
                'enterprise_ids',
                'is_escrow_project',
                'is_seller_kyc_required',
                'is_buyer_kyc_required',
            ]);
        });
    }
};
