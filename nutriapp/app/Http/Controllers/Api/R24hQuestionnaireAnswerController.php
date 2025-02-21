<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\R24hQuestionnaireAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class R24hQuestionnaireAnswerController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'answers' => 'required|array',
            'answers.*.r24h_questionnaire_item_id' => 'required|exists:r24h_questionnaire_items,id',
            'answers.*.answer' => 'required|string'
        ]);

        $answers = collect($request->answers)->map(function ($answer) {
            return new R24hQuestionnaireAnswer([
                'user_id' => Auth::id(),
                'r24h_questionnaire_item_id' => $answer['r24h_questionnaire_item_id'],
                'answer' => $answer['answer']
            ]);
        });

        Auth::user()->r24hQuestionnaireAnswers()->saveMany($answers);

        return response()->json(['message' => 'Answers saved successfully'], 201);
    }

    public function index()
    {
        $answers = Auth::user()->r24hQuestionnaireAnswers()
            ->with(['questionnaireItem.section'])
            ->get();

        return response()->json($answers);
    }
}
