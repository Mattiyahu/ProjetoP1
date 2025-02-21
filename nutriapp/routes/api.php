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
use App\Http\Controllers\Api\RecipeController;

// Public routes
Route::apiResource('foods', FoodController::class)->only(['index', 'show']);

// Educational Content public routes (view only)
Route::middleware(['permission:view educational content'])->group(function () {
    Route::get('educational-contents', [EducationalContentController::class, 'index']);
    Route::get('educational-contents/{educationalContent}', [EducationalContentController::class, 'show']);
});

Route::apiResource('purple-questions', PurpleQuestionController::class)->only(['index', 'show']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Educational Content protected routes
    Route::middleware(['permission:create educational content'])->group(function () {
        Route::post('educational-contents', [EducationalContentController::class, 'store']);
    });
    Route::middleware(['permission:edit educational content'])->group(function () {
        Route::put('educational-contents/{educationalContent}', [EducationalContentController::class, 'update']);
        Route::patch('educational-contents/{educationalContent}', [EducationalContentController::class, 'update']);
    });
    Route::middleware(['permission:delete educational content'])->group(function () {
        Route::delete('educational-contents/{educationalContent}', [EducationalContentController::class, 'destroy']);
    });

    // Recipe protected routes
    Route::middleware(['permission:view recipes'])->group(function () {
        Route::get('recipes', [RecipeController::class, 'index']);
        Route::get('recipes/{recipe}', [RecipeController::class, 'show']);
    });
    Route::middleware(['permission:create recipes'])->group(function () {
        Route::post('recipes', [RecipeController::class, 'store']);
    });
    Route::middleware(['permission:edit recipes'])->group(function () {
        Route::put('recipes/{recipe}', [RecipeController::class, 'update']);
        Route::patch('recipes/{recipe}', [RecipeController::class, 'update']);
    });
    Route::middleware(['permission:delete recipes'])->group(function () {
        Route::delete('recipes/{recipe}', [RecipeController::class, 'destroy']);
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
