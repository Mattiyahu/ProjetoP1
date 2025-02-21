<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\EducationalContentController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->name('login')
    ->middleware('guest');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['web', 'guest']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Educational Content Routes
    Route::prefix('educational-content')->name('educational.content.')->group(function () {
        Route::get('/', [EducationalContentController::class, 'index'])
            ->middleware('permission:view educational content')
            ->name('index');
            
        Route::get('/create', [EducationalContentController::class, 'create'])
            ->middleware('permission:create educational content')
            ->name('create');
            
        Route::post('/', [EducationalContentController::class, 'store'])
            ->middleware('permission:create educational content')
            ->name('store');
            
        Route::get('/{content}/edit', [EducationalContentController::class, 'edit'])
            ->middleware('permission:edit educational content')
            ->name('edit');
            
        Route::put('/{content}', [EducationalContentController::class, 'update'])
            ->middleware('permission:edit educational content')
            ->name('update');
            
        Route::delete('/{content}', [EducationalContentController::class, 'destroy'])
            ->middleware('permission:delete educational content')
            ->name('destroy');
    });

    // Recipe Routes
    Route::prefix('recipes')->name('recipes.')->group(function () {
        Route::get('/', [RecipeController::class, 'index'])
            ->middleware('permission:view recipes')
            ->name('index');
            
        Route::get('/create', [RecipeController::class, 'create'])
            ->middleware('permission:create recipes')
            ->name('create');
            
        Route::post('/', [RecipeController::class, 'store'])
            ->middleware('permission:create recipes')
            ->name('store');
            
        Route::get('/{recipe}/edit', [RecipeController::class, 'edit'])
            ->middleware('permission:edit recipes')
            ->name('edit');
            
        Route::put('/{recipe}', [RecipeController::class, 'update'])
            ->middleware('permission:edit recipes')
            ->name('update');
            
        Route::delete('/{recipe}', [RecipeController::class, 'destroy'])
            ->middleware('permission:delete recipes')
            ->name('destroy');
    });
});

// Google OAuth Routes
Route::prefix('auth')->group(function () {
    Route::get('/google', [GoogleController::class, 'redirectToGoogle'])->name('google.login');
    Route::get('/google/callback', [GoogleController::class, 'handleGoogleCallback'])->middleware('web');
});

require __DIR__.'/auth.php';
