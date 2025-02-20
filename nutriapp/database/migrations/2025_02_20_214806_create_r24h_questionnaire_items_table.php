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
        Schema::create('r24h_questionnaire_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('r24h_questionnaire_section_id')->constrained()->cascadeOnDelete(); // Relacionamento com a seção
            $table->string('field_name'); // Nome do campo (REFEIÇÃO/HORÁRIO/LOCAL, PREPARAÇÃO, etc.)
            $table->string('field_type')->default('text'); // Tipo do campo (text, textarea, select, etc.) - pode ser útil para diferentes tipos de input no frontend
            $table->integer('order')->default(0); // Ordem de exibição dos campos dentro da seção
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('r24h_questionnaire_items');
    }
};