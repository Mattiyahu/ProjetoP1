<?php

namespace App\Http\Controllers;

use App\Models\PurpleQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurpleQuestionController extends Controller
{
    public function index()
    {
        $questions = PurpleQuestion::all();
        return Inertia::render('PurpleQuestions', [
            'questions' => $questions
        ]);
    }
}
