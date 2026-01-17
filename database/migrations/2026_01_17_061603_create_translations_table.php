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
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->text('source_text');
            $table->string('source_text_hash', 64)->index(); // MD5/SHA256 hash for lookup
            $table->string('target_language', 10);
            $table->text('translated_text');
            $table->timestamps();

            $table->index(['source_text_hash', 'target_language']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
