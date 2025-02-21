<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrangeQuestionController;
use App\Http\Controllers\Api\PurpleQuestionController;
use App\Http\Controllers\Api\R24hQuestionnaireAnswerController;
use App\Http\Controllers\Api\R24hQuestionnaireSectionController;
use App\Http\Controllers\Api\R24hQuestionnaireItemController;
use App\Http\Controllers\Api\PurpleQuestionAnswerController;
use App\Http\Controllers\Api\EducationalContentController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\FoodTrackingController;

// Public routes
Route::apiResource('foods', FoodController::class)->only(['index', 'show']);
Route::apiResource('educational-contents', EducationalContentController::class);
Route::apiResource('purple-questions', PurpleQuestionController::class)->only(['index', 'show']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // R24H Questionnaire routes
    Route::apiResource('r24h-questionnaire-sections', R24hQuestionnaireSectionController::class);
    Route::apiResource('r24h-questionnaire-items', R24hQuestionnaireItemController::class);
    Route::post('r24h-questionnaire-answers', [R24hQuestionnaireAnswerController::class, 'store']);
    Route::get('r24h-questionnaire-answers', [R24hQuestionnaireAnswerController::class, 'index']);

    // Protected Purple Questions routes
    Route::apiResource('purple-questions', PurpleQuestionController::class)->except(['index', 'show']);
    Route::post('/purple-question-answers', [PurpleQuestionAnswerController::class, 'store']);
    
    // Food Tracking routes
    Route::get('/food-tracking/questions', [FoodTrackingController::class, 'getQuestions']);
    Route::post('/food-tracking/answers', [FoodTrackingController::class, 'storeAnswers']);
    Route::get('/food-tracking/user-answers', [FoodTrackingController::class, 'getUserAnswers']);
});

// Ensure CSRF token is set for API requests
Route::get('/sanctum/token', function (Request $request) {
    return response()->json(['token' => csrf_token()]);
});
