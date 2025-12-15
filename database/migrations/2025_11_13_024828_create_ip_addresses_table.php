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
        Schema::create('ip_addresses', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('ip_address', 45)->unique();
            $table->enum('type', ['static','dedicated','proxy','vpn','dynamic'])->default('static');
            $table->string('provider', 100)->nullable();
            $table->text('location')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_assigned')->default(false);
            $table->string('username', 100)->nullable(); 
            $table->string('password', 100)->nullable(); 
            $table->string('port', 10)->nullable();
            $table->timestamp('assigned_at')->nullable();
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ip_addresses');
    }
};
