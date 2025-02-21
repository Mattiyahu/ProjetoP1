<?php

namespace Database\Seeders;

use App\Models\FoodTrackingQuestion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class FoodTrackingQuestionsSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        FoodTrackingQuestion::truncate();
        Schema::enableForeignKeyConstraints();

        $questions = [
            // Café da manhã
            [
                'question_text' => 'O que você comeu no café da manhã?',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 1
            ],
            [
                'question_text' => 'Qual a quantidade que você comeu no café da manhã? (Descreva em medidas caseiras)',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 2
            ],
            // Lanche da manhã
            [
                'question_text' => 'O que você comeu no lanche da manhã?',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 3
            ],
            [
                'question_text' => 'Qual a quantidade que você comeu no lanche da manhã? (Descreva em medidas caseiras)',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 4
            ],
            // Almoço
            [
                'question_text' => 'O que você comeu no almoço?',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 5
            ],
            [
                'question_text' => 'Qual a quantidade que você comeu no almoço? (Descreva em medidas caseiras)',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 6
            ],
            // Lanche da tarde
            [
                'question_text' => 'O que você comeu no lanche da tarde?',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 7
            ],
            [
                'question_text' => 'Qual a quantidade que você comeu no lanche da tarde? (Descreva em medidas caseiras)',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 8
            ],
            // Jantar
            [
                'question_text' => 'O que você comeu no jantar?',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 9
            ],
            [
                'question_text' => 'Qual a quantidade que você comeu no jantar? (Descreva em medidas caseiras)',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 10
            ],
            // Lanche da noite
            [
                'question_text' => 'O que você comeu no lanche da noite?',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 11
            ],
            [
                'question_text' => 'Qual a quantidade que você comeu no lanche da noite? (Descreva em medidas caseiras)',
                'question_type' => 'textarea',
                'category' => 'meal_tracking',
                'answer_options' => null,
                'order' => 12
            ],
            // Perguntas sobre sentimentos durante as refeições
            [
                'question_text' => 'Qual o seu sentimento durante a refeição?',
                'question_type' => 'select',
                'category' => 'emotional',
                'answer_options' => ['Calmo', 'Ansioso', 'Triste', 'Irritado', 'Outro'],
                'order' => 13
            ],
            [
                'question_text' => 'Se selecionou "Outro" no sentimento, por favor especifique:',
                'question_type' => 'text',
                'category' => 'emotional',
                'answer_options' => null,
                'order' => 14
            ],
            [
                'question_text' => 'Você sentiu que estava comendo por fome ou por questões emocionais?',
                'question_type' => 'select',
                'category' => 'emotional',
                'answer_options' => ['Fome física', 'Fome emocional'],
                'order' => 15
            ],
            [
                'question_text' => 'Como você se sentiu após sua refeição?',
                'question_type' => 'select',
                'category' => 'emotional',
                'answer_options' => ['Satisfeito', 'Culpado', 'Indiferente', 'Energizado'],
                'order' => 16
            ],
            // Perguntas sobre Hidratação
            [
                'question_text' => 'Quantos litros de água você consumiu hoje?',
                'question_type' => 'text',
                'category' => 'hydration',
                'answer_options' => null,
                'order' => 17
            ],
            [
                'question_text' => 'Você consumiu outras bebidas hoje (suco, café, chá ou refrigerante)?',
                'question_type' => 'select',
                'category' => 'hydration',
                'answer_options' => ['Sim', 'Não'],
                'order' => 18
            ],
            [
                'question_text' => 'Se sim, quais bebidas e em que quantidade?',
                'question_type' => 'textarea',
                'category' => 'hydration',
                'answer_options' => null,
                'order' => 19
            ],
        ];

        foreach ($questions as $question) {
            FoodTrackingQuestion::create($question);
        }
    }
}
