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
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nome do alimento (ex: Banana, Arroz Branco, Frango Grelhado)
            $table->string('serving_size')->nullable(); // Tamanho da porção (ex: 1 unidade, 100g, 1 xícara)
            $table->float('calories')->nullable(); // Calorias por porção
            $table->float('protein')->nullable();  // Proteína em gramas por porção
            $table->float('carbohydrates')->nullable(); // Carboidratos em gramas por porção
            $table->float('fat')->nullable();      // Gordura em gramas por porção
            // Você pode adicionar mais nutrientes aqui (fibras, vitaminas, minerais, etc.) conforme necessário
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foods');
    }
};