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
        Schema::create('purple_questions', function (Blueprint $table) {
            $table->id();
            $table->string('question_text');
            $table->json('answer_options')->nullable(); // Se tiver opções predefinidas
            $table->string('question_type')->default('radio'); // Ex: radio, checkbox, text, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purple_questions');
    }
};