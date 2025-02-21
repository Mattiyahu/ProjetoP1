<?php

namespace Database\Seeders;

use App\Models\PurpleQuestion;
use App\Models\PurpleQuestionAnswer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class PurpleQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks
        Schema::disableForeignKeyConstraints();
        
        // Clear both tables
        PurpleQuestionAnswer::truncate();
        PurpleQuestion::truncate();

        // Re-enable foreign key checks
        Schema::enableForeignKeyConstraints();

        // Perguntas sobre saúde mental
        PurpleQuestion::create([
            'question_text' => 'Você já foi diagnosticado(a) com algum transtorno mental? (Se sim, qual?)',
            'question_type' => 'text',
        ]);
        PurpleQuestion::create([
            'question_text' => 'Com que frequência você apresenta sintomas? (Nunca / Raramente / Às vezes / Frequentemente / Sempre)',
            'question_type' => 'select',
            'answer_options' => ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
        ]);
        PurpleQuestion::create([
            'question_text' => 'Você está atualmente recebendo algum tipo de tratamento para sua saúde mental? (Medicamentos / Terapia / Ambos / Nenhum)',
            'question_type' => 'select',
            'answer_options' => ['Medicamentos', 'Terapia', 'Ambos', 'Nenhum'],
        ]);
        PurpleQuestion::create([
            'question_text' => 'Você acredita que seus hábitos alimentares influenciam seu humor e emoções? (Sim / Não / Não sei)',
            'question_type' => 'select',
            'answer_options' => ['Sim', 'Não', 'Não sei'],
        ]);

        // Perguntas sobre usabilidade
        PurpleQuestion::create([
            'question_text' => 'O que você espera de um aplicativo de saúde mental e alimentação? (Monitoramento de refeições / Dicas de bem-estar / Acompanhamento com profissionais / Outros)',
            'question_type' => 'checkbox',
            'answer_options' => ['Monitoramento de refeições', 'Dicas de bem-estar', 'Acompanhamento com profissionais', 'Outros'],
        ]);
        PurpleQuestion::create([
            'question_text' => 'Com que frequência você gostaria de receber notificações ou lembretes para cuidar de sua saúde mental e alimentação? (Diariamente / Algumas vezes por semana / Apenas quando necessário)',
            'question_type' => 'select',
            'answer_options' => ['Diariamente', 'Algumas vezes por semana', 'Apenas quando necessário'],
        ]);

        // Perguntas sobre objetivos, desafios e motivações
        PurpleQuestion::create([
            'question_text' => 'O que você gostaria de melhorar em sua alimentação?',
            'question_type' => 'text',
        ]);
        PurpleQuestion::create([
            'question_text' => 'O que te motiva a cuidar melhor da sua saúde mental e física?',
            'question_type' => 'text',
        ]);
        PurpleQuestion::create([
            'question_text' => 'Quais são os maiores desafios que você enfrenta para manter uma alimentação saudável? (Falta de tempo / Custo / Falta de motivação / Dificuldade de acesso a alimentos saudáveis / Outros)',
            'question_type' => 'checkbox',
            'answer_options' => ['Falta de tempo', 'Custo', 'Falta de motivação', 'Dificuldade de acesso a alimentos saudáveis', 'Outros'],
        ]);

        // Perguntas sobre estilo de vida
        PurpleQuestion::create([
            'question_text' => 'Você pratica atividades físicas regularmente? (Sim / Não / Às vezes)',
            'question_type' => 'select',
            'answer_options' => ['Sim', 'Não', 'Às vezes'],
        ]);

        // Perguntas sobre hábitos alimentares
        PurpleQuestion::create([
            'question_text' => 'Como você descreveria sua alimentação atual?',
            'question_type' => 'text',
        ]);
        PurpleQuestion::create([
            'question_text' => 'Você segue algum tipo de dieta específica?',
            'question_type' => 'select',
            'answer_options' => ['Sim', 'Não'],
        ]);
        PurpleQuestion::create([
            'question_text' => 'Você tem algum tipo de intolerância ou alergia alimentar? (Sim / Não) (Se sim, especifique)',
            'question_type' => 'select',
            'answer_options' => ['Sim', 'Não'],
        ]);
    }
}
