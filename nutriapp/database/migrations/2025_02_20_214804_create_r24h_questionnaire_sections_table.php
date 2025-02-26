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
        Schema::create('r24h_questionnaire_sections', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nome da seção (Café da Manhã, Almoço, etc.)
            $table->integer('order')->default(0); // Ordem de exibição das seções
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('r24h_questionnaire_sections');
    }
};