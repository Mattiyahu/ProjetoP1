<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrangeQuestionController;
use App\Http\Controllers\Api\PurpleQuestionController;
use App\Http\Controllers\Api\PurpleQuestionAnswerController;
use App\Http\Controllers\Api\R24hQuestionnaireItemController;
use App\Http\Controllers\Api\R24hQuestionnaireSectionController;
use App\Http\Controllers\Api\EducationalContentController;
use App\Http\Controllers\Api\FoodController;

// Public routes
Route::apiResource('foods', FoodController::class)->only(['index', 'show']);
Route::apiResource('educational-contents', EducationalContentController::class);
Route::apiResource('r24h-questionnaire-sections', R24hQuestionnaireSectionController::class);
Route::apiResource('r24h-questionnaire-items', R24hQuestionnaireItemController::class);
Route::apiResource('purple-questions', PurpleQuestionController::class)->only(['index', 'show']);
Route::apiResource('orange-questions', OrangeQuestionController::class)->only(['index', 'show']);

// Protected routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Protected CRUD operations
    Route::apiResource('purple-questions', PurpleQuestionController::class)->except(['index', 'show']);
    Route::apiResource('orange-questions', OrangeQuestionController::class)->except(['index', 'show']);
    
    // Protected route for submitting answers
    Route::post('/purple-question-answers', [PurpleQuestionAnswerController::class, 'store']);
});

// Ensure CSRF token is set for API requests
Route::get('/sanctum/token', function (Request $request) {
    return response()->json(['token' => csrf_token()]);
});
