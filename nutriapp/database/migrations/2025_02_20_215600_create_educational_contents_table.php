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
        Schema::create('educational_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Título do conteúdo
            $table->string('slug')->unique()->nullable(); // Slug para URLs amigáveis (opcional, mas recomendado)
            $table->longText('body'); // Corpo do conteúdo (onde o editor WYSIWYG será usado)
            $table->string('content_type')->default('educational'); // Tipo de conteúdo (ex: 'educational', 'recipe', etc.) - para categorizar se precisar
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educational_contents');
    }
};