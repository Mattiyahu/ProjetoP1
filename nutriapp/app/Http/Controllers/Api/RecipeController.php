<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with('user')->latest()->get();
        return response()->json($recipes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'preparation_time' => 'required|string',
            'difficulty_level' => 'required|string',
            'image_url' => 'nullable|url',
            'content' => 'nullable|string'
        ]);

        $validated['user_id'] = Auth::id();

        $recipe = Recipe::create($validated);

        return response()->json($recipe, 201);
    }

    public function show(Recipe $recipe)
    {
        return response()->json($recipe->load('user'));
    }

    public function update(Request $request, Recipe $recipe)
    {
        $this->authorize('update', $recipe);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'preparation_time' => 'required|string',
            'difficulty_level' => 'required|string',
            'image_url' => 'nullable|url',
            'content' => 'nullable|string'
        ]);

        $recipe->update($validated);

        return response()->json($recipe);
    }

    public function destroy(Recipe $recipe)
    {
        $this->authorize('delete', $recipe);
        
        $recipe->delete();

        return response()->json(null, 204);
    }
}
