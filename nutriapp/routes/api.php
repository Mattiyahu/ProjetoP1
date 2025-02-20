<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrangeQuestionController;
use App\Http\Controllers\Api\PurpleQuestionController;
use App\Http\Controllers\Api\R24hQuestionnaireItemController;
use App\Http\Controllers\Api\R24hQuestionnaireSectionController;
use App\Http\Controllers\Api\EducationalContentController;
use App\Http\Controllers\Api\FoodController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::apiResource('foods', FoodController::class)->only(['index', 'show']); // Apenas rotas de index e show para este exemplo, CRUD completo se precisar
Route::apiResource('educational-contents', EducationalContentController::class);
Route::apiResource('r24h-questionnaire-sections', R24hQuestionnaireSectionController::class);
Route::apiResource('r24h-questionnaire-items', R24hQuestionnaireItemController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('purple-questions', PurpleQuestionController::class);
Route::apiResource('orange-questions', OrangeQuestionController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
