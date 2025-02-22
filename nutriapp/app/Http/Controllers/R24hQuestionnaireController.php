<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\R24hQuestionnaireSection;

class R24hQuestionnaireController extends Controller
{
    public function index()
    {
        $sections = R24hQuestionnaireSection::with('items')
            ->orderBy('order')
            ->get();
        
        return Inertia::render('R24hQuestionnaire', [
            'sections' => $sections
        ]);
    }
}
