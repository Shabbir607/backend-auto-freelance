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
        // Teams Table
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('plan')->default('starter'); // starter, pro, enterprise
            $table->foreignId('admin_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });

        // Add team_id to users
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('team_id')->nullable()->constrained('teams')->nullOnDelete();
        });

        // Channels Table
        Schema::create('channels', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('team_id')->constrained('teams')->cascadeOnDelete();
            $table->string('name');
            $table->string('description')->nullable();
            $table->boolean('is_private')->default(false);
            $table->foreignId('project_id')->nullable(); // Optional link to a project
            $table->timestamps();
        });

        // Channel Members
        Schema::create('channel_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('channel_id')->constrained('channels')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            
            $table->unique(['channel_id', 'user_id']);
        });

        // Team Messages
        Schema::create('team_messages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('channel_id')->nullable()->constrained('channels')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('content');
            $table->json('attachments')->nullable();
            $table->json('reactions')->nullable();
            $table->boolean('is_edited')->default(false);
            $table->foreignId('parent_message_id')->nullable()->constrained('team_messages')->cascadeOnDelete(); // For threads
            $table->timestamps();
        });

        // Notifications
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('type'); // message, mention, project, meeting, system
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('read')->default(false);
            $table->string('link')->nullable();
            $table->timestamps();
        });

        // Team Invitations
        Schema::create('team_invitations', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('team_id')->constrained('teams')->cascadeOnDelete();
            $table->string('email');
            $table->string('role')->default('member'); // member, admin
            $table->string('token')->unique();
            $table->string('status')->default('pending'); // pending, accepted, declined
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::dropIfExists('team_invitations');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('team_messages');
        Schema::dropIfExists('channel_members');
        Schema::dropIfExists('channels');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['team_id']);
            $table->dropColumn('team_id');
        });

        Schema::dropIfExists('teams');

        Schema::enableForeignKeyConstraints();
    }
};
