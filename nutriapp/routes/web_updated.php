<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EducationalContentController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PurpleQuestionController;
use App\Http\Controllers\FoodTrackingController;
use App\Http\Controllers\R24hQuestionnaireController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Educational Content Routes with Strapi Integration
    Route::prefix('educational-content')->group(function () {
        Route::get('/', [EducationalContentController::class, 'index'])->name('educational-content');
        Route::get('/create', [EducationalContentController::class, 'create'])->name('educational-content.create');
        Route::post('/', [EducationalContentController::class, 'store'])->name('educational-content.store');
        Route::get('/{id}/edit', [EducationalContentController::class, 'edit'])->name('educational-content.edit');
        Route::put('/{id}', [EducationalContentController::class, 'update'])->name('educational-content.update');
        Route::delete('/{id}', [EducationalContentController::class, 'destroy'])->name('educational-content.destroy');
    });

    // Existing Routes
    Route::get('/purple-questions', [PurpleQuestionController::class, 'index'])->name('purple-questions');
    Route::get('/food-tracking', [FoodTrackingController::class, 'index'])->name('food-tracking');
    Route::get('/r24h-questionnaire', [R24hQuestionnaireController::class, 'index'])->name('r24h-questionnaire');

    // Recipe Routes
    Route::prefix('recipes')->name('recipes.')->group(function () {
        Route::get('/', [RecipeController::class, 'index'])->name('index');
        Route::get('/create', [RecipeController::class, 'create'])->name('create');
        Route::post('/', [RecipeController::class, 'store'])->name('store');
        Route::get('/{recipe}/edit', [RecipeController::class, 'edit'])->name('edit');
        Route::put('/{recipe}', [RecipeController::class, 'update'])->name('update');
        Route::delete('/{recipe}', [RecipeController::class, 'destroy'])->name('destroy');
    });
});

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

// Google OAuth Routes
Route::prefix('auth')->group(function () {
    Route::get('/google', [GoogleController::class, 'redirectToGoogle'])->name('google.login');
    Route::get('/google/callback', [GoogleController::class, 'handleGoogleCallback'])->middleware('web');
});

require __DIR__.'/auth.php';
