<?php

namespace Database\Seeders;

use App\Models\R24hQuestionnaireItem;
use App\Models\R24hQuestionnaireSection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Importe a facade DB

class R24hQuestionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Desabilita a verificação de chaves estrangeiras
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        R24hQuestionnaireItem::truncate(); // Trunca primeiro a tabela que tem a chave estrangeira
        R24hQuestionnaireSection::truncate();

        $sections = [
            ['name' => 'Café da Manhã', 'order' => 1],
            ['name' => 'Almoço', 'order' => 2],
            ['name' => 'Lanche da Tarde', 'order' => 3],
            ['name' => 'Jantar', 'order' => 4],
            ['name' => 'Ceia', 'order' => 5],
        ];

        foreach ($sections as $sectionData) {
            $section = R24hQuestionnaireSection::create($sectionData);

            if ($section->name === 'Café da Manhã') {
                $items = [
                    ['field_name' => 'REFEIÇÃO/HORÁRIO/LOCAL', 'order' => 1, 'field_type' => 'text'],
                    ['field_name' => 'PREPARAÇÃO', 'order' => 2, 'field_type' => 'text'],
                    ['field_name' => 'ALIMENTO', 'order' => 3, 'field_type' => 'text'],
                    ['field_name' => 'QUANTIDADE/MEDIDA CASEIRA', 'order' => 4, 'field_type' => 'text'],
                ];
                foreach ($items as $itemData) {
                    $section->items()->create($itemData);
                }
            } elseif ($section->name === 'Almoço') {
                $items = [
                    ['field_name' => 'REFEIÇÃO/HORÁRIO/LOCAL', 'order' => 1, 'field_type' => 'text'],
                    ['field_name' => 'PREPARAÇÃO', 'order' => 2, 'field_type' => 'text'],
                    ['field_name' => 'ALIMENTO', 'order' => 3, 'field_type' => 'text'],
                    ['field_name' => 'QUANTIDADE/MEDIDA CASEIRA', 'order' => 4, 'field_type' => 'text'],
                ];
                foreach ($items as $itemData) {
                    $section->items()->create($itemData);
                }
            } elseif ($section->name === 'Lanche da Tarde') {
                $items = [
                    ['field_name' => 'REFEIÇÃO/HORÁRIO/LOCAL', 'order' => 1, 'field_type' => 'text'],
                    ['field_name' => 'PREPARAÇÃO', 'order' => 2, 'field_type' => 'text'],
                    ['field_name' => 'ALIMENTO', 'order' => 3, 'field_type' => 'text'],
                    ['field_name' => 'QUANTIDADE/MEDIDA CASEIRA', 'order' => 4, 'field_type' => 'text'],
                ];
                foreach ($items as $itemData) {
                    $section->items()->create($itemData);
                }
            } elseif ($section->name === 'Jantar') {
                $items = [
                    ['field_name' => 'REFEIÇÃO/HORÁRIO/LOCAL', 'order' => 1, 'field_type' => 'text'],
                    ['field_name' => 'PREPARAÇÃO', 'order' => 2, 'field_type' => 'text'],
                    ['field_name' => 'ALIMENTO', 'order' => 3, 'field_type' => 'text'],
                    ['field_name' => 'QUANTIDADE/MEDIDA CASEIRA', 'order' => 4, 'field_type' => 'text'],
                ];
                foreach ($items as $itemData) {
                    $section->items()->create($itemData);
                }
            } elseif ($section->name === 'Ceia') {
                $items = [
                    ['field_name' => 'REFEIÇÃO/HORÁRIO/LOCAL', 'order' => 1, 'field_type' => 'text'],
                    ['field_name' => 'PREPARAÇÃO', 'order' => 2, 'field_type' => 'text'],
                    ['field_name' => 'ALIMENTO', 'order' => 3, 'field_type' => 'text'],
                    ['field_name' => 'QUANTIDADE/MEDIDA CASEIRA', 'order' => 4, 'field_type' => 'text'],
                ];
                foreach ($items as $itemData) {
                    $section->items()->create($itemData);
                }
            }
        }

        // Reabilita a verificação de chaves estrangeiras
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}