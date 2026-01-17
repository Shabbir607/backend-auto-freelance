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
        // Lookup Tables
        Schema::create('job_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->longText('image')->nullable();
            $table->longText('icon')->nullable();
            $table->timestamps();
        });

        Schema::create('job_roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('professions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('job_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('salary_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('industry_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('organization_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('team_sizes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        Schema::create('nationalities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        // Companies
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('industry_type_id')->constrained('industry_types')->cascadeOnDelete();
            $table->foreignId('organization_type_id')->constrained('organization_types')->cascadeOnDelete();
            $table->foreignId('team_size_id')->nullable()->constrained('team_sizes')->cascadeOnDelete();
            $table->foreignId('nationality_id')->nullable()->constrained('nationalities')->cascadeOnDelete();
            $table->string('logo')->nullable();
            $table->string('banner')->nullable();
            $table->date('establishment_date')->nullable();
            $table->string('website')->nullable();
            $table->boolean('visibility')->default(1);
            $table->boolean('profile_completion')->default(0);
            $table->text('bio')->nullable();
            $table->text('vision')->nullable();
            $table->unsignedBigInteger('total_views')->default(0);
            $table->timestamps();
        });

        // Candidates
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('role_id')->nullable()->constrained('job_roles')->cascadeOnDelete();
            $table->foreignId('profession_id')->nullable()->constrained('professions')->cascadeOnDelete();
            $table->foreignId('experience_id')->nullable()->constrained('experiences')->cascadeOnDelete();
            $table->foreignId('education_id')->nullable()->constrained('education')->cascadeOnDelete();
            $table->foreignId('nationality_id')->nullable()->constrained('nationalities')->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('website')->nullable();
            $table->string('photo')->nullable();
            $table->string('cv')->nullable();
            $table->text('bio')->nullable();
            $table->string('marital_status')->nullable();
            $table->datetime('birth_date')->nullable();
            $table->boolean('visibility')->default(1);
            $table->boolean('cv_visibility')->default(1);
            $table->boolean('received_job_alert')->default(1);
            $table->integer('profile_complete')->default(100);
            $table->timestamps();
        });

        // Job Posts (Renamed from jobs)
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('job_categories')->cascadeOnDelete();
            $table->foreignId('role_id')->constrained('job_roles')->cascadeOnDelete();
            $table->foreignId('experience_id')->constrained('experiences')->cascadeOnDelete();
            $table->foreignId('education_id')->constrained('education')->cascadeOnDelete();
            $table->foreignId('job_type_id')->constrained('job_types')->cascadeOnDelete();
            $table->foreignId('salary_type_id')->constrained('salary_types')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->nullable();
            $table->string('vacancies');
            $table->integer('min_salary');
            $table->integer('max_salary');
            $table->date('deadline')->nullable();
            $table->longText('description');
            $table->enum('status', ['pending', 'active', 'expired'])->default('pending');
            $table->enum('apply_on', ['app', 'email', 'custom_url'])->default('app');
            $table->string('apply_email')->nullable();
            $table->string('apply_url')->nullable();
            $table->boolean('featured')->default(0);
            $table->boolean('highlight')->default(0);
            $table->boolean('is_remote')->default(0);
            $table->unsignedBigInteger('total_views')->default(0);
            $table->timestamps();
        });

        // Applied Jobs
        Schema::create('applied_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained('candidates')->cascadeOnDelete();
            $table->foreignId('job_id')->constrained('job_posts')->cascadeOnDelete(); // References job_posts
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_jobs');
        Schema::dropIfExists('job_posts');
        Schema::dropIfExists('candidates');
        Schema::dropIfExists('companies');
        Schema::dropIfExists('nationalities');
        Schema::dropIfExists('team_sizes');
        Schema::dropIfExists('organization_types');
        Schema::dropIfExists('industry_types');
        Schema::dropIfExists('salary_types');
        Schema::dropIfExists('job_types');
        Schema::dropIfExists('education');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('professions');
        Schema::dropIfExists('job_roles');
        Schema::dropIfExists('job_categories');
    }
};
