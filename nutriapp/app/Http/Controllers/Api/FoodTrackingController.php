<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FoodTrackingQuestion;
use App\Models\FoodTrackingAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FoodTrackingController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'verified']);
    }

    public function getQuestions(Request $request)
    {
        try {
            Log::info('Getting food tracking questions', [
                'user_id' => $request->user()->id,
                'token' => $request->bearerToken()
            ]);

            $questions = FoodTrackingQuestion::orderBy('order')->get();
            return response()->json($questions, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching food tracking questions: ' . $e->getMessage(), [
                'user_id' => $request->user()->id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Erro ao carregar perguntas'], 500);
        }
    }

    public function storeAnswers(Request $request)
    {
        try {
            Log::info('Receiving food tracking answers submission', [
                'user_id' => $request->user()->id,
                'token' => $request->bearerToken()
            ]);

            $request->validate([
                'answers' => 'required|array',
                'answers.*.question_id' => 'required|exists:food_tracking_questions,id',
                'answers.*.answer' => 'required|string',
                'tracking_date' => 'required|date'
            ]);

            foreach ($request->input('answers') as $answerData) {
                FoodTrackingAnswer::create([
                    'user_id' => $request->user()->id,
                    'food_tracking_question_id' => $answerData['question_id'],
                    'answer' => $answerData['answer'],
                    'tracking_date' => $request->input('tracking_date')
                ]);
            }

            return response()->json(['message' => 'Respostas salvas com sucesso!'], 201);
        } catch (\Exception $e) {
            Log::error('Error saving food tracking answers', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Erro ao salvar respostas: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUserAnswers(Request $request)
    {
        try {
            Log::info('Getting user food tracking answers', [
                'user_id' => $request->user()->id,
                'token' => $request->bearerToken()
            ]);

            $answers = FoodTrackingAnswer::with('question')
                ->where('user_id', $request->user()->id)
                ->where('tracking_date', $request->input('date', now()->toDateString()))
                ->get();
            
            return response()->json($answers);
        } catch (\Exception $e) {
            Log::error('Error fetching user food tracking answers: ' . $e->getMessage(), [
                'user_id' => $request->user()->id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Erro ao carregar respostas'], 500);
        }
    }
}
