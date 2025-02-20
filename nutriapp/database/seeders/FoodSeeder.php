<?php

namespace Database\Seeders;

use App\Models\Food;
use Illuminate\Database\Seeder;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Food::truncate(); // Limpa a tabela antes de inserir novos dados

        Food::create([
            'name' => 'Banana Prata',
            'serving_size' => '1 unidade média (100g)',
            'calories' => 89,
            'protein' => 1.1,
            'carbohydrates' => 23,
            'fat' => 0.3,
        ]);

        Food::create([
            'name' => 'Arroz Branco Cozido',
            'serving_size' => '1 xícara (160g)',
            'calories' => 205,
            'protein' => 4.2,
            'carbohydrates' => 45,
            'fat' => 0.4,
        ]);

        Food::create([
            'name' => 'Frango Grelhado (Peito)',
            'serving_size' => '100g',
            'calories' => 165,
            'protein' => 31,
            'carbohydrates' => 0,
            'fat' => 3.6,
        ]);

        Food::create([
            'name' => 'Leite Integral',
            'serving_size' => '1 copo (200ml)',
            'calories' => 120,
            'protein' => 8,
            'carbohydrates' => 12,
            'fat' => 5,
        ]);

        // Adicione mais alimentos de exemplo aqui...
    }
}