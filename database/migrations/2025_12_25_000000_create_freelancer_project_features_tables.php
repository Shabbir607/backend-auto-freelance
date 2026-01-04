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
        Schema::create('bids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('bidder_id')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 15, 2);
            $table->integer('period')->nullable(); // In days
            $table->integer('milestone_percentage')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected', 'retracted'])->default('pending');
            $table->timestamps();
        });

        Schema::create('milestones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('bidder_id')->constrained('users')->onDelete('cascade'); // Freelancer
            $table->decimal('amount', 15, 2);
            $table->string('reason');
            $table->enum('status', ['pending', 'active', 'completed', 'released', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milestones');
        Schema::dropIfExists('bids');
    }
};
