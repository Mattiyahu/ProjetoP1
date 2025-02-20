<?php

namespace Database\Seeders;

use App\Models\OrangeQuestion;
use Illuminate\Database\Seeder;

class OrangeQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OrangeQuestion::truncate(); // Limpa a tabela antes de inserir novos dados

        // Perguntas sobre Alimentação (Acompanhamento do Consumo Alimentar)
        OrangeQuestion::create([
            'question_text' => 'O que você comeu hoje? (Campo para o usuário listar alimentos consumidos no Café da manhã, Lanche da manhã, Almoço, Lanche da tarde, Jantar e Lanche da noite / Liste com detalhes os alimentos consumidos)',
            'question_type' => 'textarea',
        ]);
        OrangeQuestion::create([
            'question_text' => 'Qual a quantidade que você comeu? (Sugestão feita pelo aplicativo sobre as medidas caseiras)',
            'question_type' => 'text',
        ]);
        OrangeQuestion::create([
            'question_text' => 'Qual o seu sentimento durante a refeição? (Calmo / Ansioso / Triste / Irritado / Outro / campo para especificar)',
            'question_type' => 'select',
            'answer_options' => ['Calmo', 'Ansioso', 'Triste', 'Irritado', 'Outro'], // 'Outro' para campo de texto extra no frontend
        ]);
        OrangeQuestion::create([
            'question_text' => 'Você sentiu que estava comendo por fome ou por questões emocionais? (Fome física / Fome emocional)',
            'question_type' => 'select',
            'answer_options' => ['Fome física', 'Fome emocional'],
        ]);
        OrangeQuestion::create([
            'question_text' => 'Como você se sentiu após sua refeição? (Satisfeito / Culpado / Indiferente / Energizado)',
            'question_type' => 'select',
            'answer_options' => ['Satisfeito', 'Culpado', 'Indiferente', 'Energizado'],
        ]);

        // Perguntas sobre Hidratação (Acompanhamento do Consumo Alimentar)
        OrangeQuestion::create([
            'question_text' => 'Quantos de agua você consumiu hoje? (Descreva a quantidade)',
            'question_type' => 'text',
        ]);
        OrangeQuestion::create([
            'question_text' => 'Você consumiu outras bebidas, como suco, café, chá ou refrigerante hoje? (Sim / Não) (Se sim, qual e em que quantidade?)',
            'question_type' => 'select-text', // Tipo personalizado para select com campo de texto condicional
            'answer_options' => ['Sim', 'Não'],
        ]);
    }
}