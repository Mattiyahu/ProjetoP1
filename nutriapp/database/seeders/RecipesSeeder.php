<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recipe;
use App\Models\User;

class RecipesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            return;
        }

        $recipes = [
            [
                'title' => 'Salada de Quinoa com Legumes',
                'description' => 'Uma salada nutritiva e saborosa com quinoa e legumes frescos.',
                'ingredients' => "1 xícara de quinoa\n2 cenouras raladas\n1 pepino em cubos\n1 pimentão vermelho em cubos\n1/2 cebola roxa picada\nSalsinha a gosto\nAzeite de oliva\nSal e pimenta a gosto",
                'instructions' => "1. Cozinhe a quinoa conforme as instruções da embalagem\n2. Misture com os legumes picados\n3. Tempere com azeite, sal e pimenta\n4. Sirva frio",
                'preparation_time' => '30 minutos',
                'difficulty_level' => 'easy',
                'user_id' => $user->id
            ],
            [
                'title' => 'Smoothie Verde',
                'description' => 'Smoothie nutritivo com frutas e vegetais verdes.',
                'ingredients' => "2 folhas de couve\n1 banana\n1 maçã\n1 copo de água de coco\nGengibre a gosto",
                'instructions' => "1. Lave bem todos os ingredientes\n2. Corte as frutas em pedaços\n3. Bata tudo no liquidificador\n4. Sirva imediatamente",
                'preparation_time' => '10 minutos',
                'difficulty_level' => 'easy',
                'user_id' => $user->id
            ],
            [
                'title' => 'Frango Grelhado com Legumes',
                'description' => 'Peito de frango grelhado com mix de legumes assados.',
                'ingredients' => "2 peitos de frango\nAbobrinha\nCenoura\nBrócolis\nAzeite de oliva\nErvas finas\nSal e pimenta",
                'instructions' => "1. Marine o frango com ervas e temperos\n2. Corte os legumes\n3. Grelhe o frango\n4. Asse os legumes com azeite\n5. Sirva quente",
                'preparation_time' => '45 minutos',
                'difficulty_level' => 'medium',
                'user_id' => $user->id
            ]
        ];

        foreach ($recipes as $recipe) {
            Recipe::create($recipe);
        }
    }
}
