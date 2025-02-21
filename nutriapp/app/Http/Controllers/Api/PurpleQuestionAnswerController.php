<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PurpleQuestionAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PurpleQuestionAnswerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function store(Request $request)
    {
        Log::info('Receiving purple question answers submission');
        
        $user = $request->user();
        Log::info('User authenticated', ['user_id' => $user->id, 'email' => $user->email]);

        $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:purple_questions,id',
            'answers.*.answer' => 'nullable|string',
        ]);

        Log::info('Validation passed, processing answers', [
            'answer_count' => count($request->input('answers')),
            'user_id' => $user->id
        ]);

        try {
            foreach ($request->input('answers') as $answerData) {
                $answer = PurpleQuestionAnswer::create([
                    'user_id' => $user->id,
                    'purple_question_id' => $answerData['question_id'],
                    'answer' => $answerData['answer'],
                ]);
                
                Log::info('Answer saved', [
                    'answer_id' => $answer->id,
                    'user_id' => $user->id,
                    'question_id' => $answerData['question_id']
                ]);
            }

            Log::info('All answers saved successfully', ['user_id' => $user->id]);
            return response()->json(['message' => 'Respostas salvas com sucesso!'], 201);

        } catch (\Exception $e) {
            Log::error('Error saving answers', [
                'error' => $e->getMessage(),
                'user_id' => $user->id
            ]);
            
            return response()->json([
                'message' => 'Erro ao salvar respostas: ' . $e->getMessage()
            ], 500);
        }
    }
}
