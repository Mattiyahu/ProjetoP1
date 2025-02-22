<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with('user')->latest()->get();
        return Inertia::render('Recipes/Index', [
            'recipes' => $recipes
        ]);
    }

    public function create()
    {
        return Inertia::render('Recipes/Create');
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

        $validated['user_id'] = auth()->id();

        Recipe::create($validated);

        return redirect()->route('recipes.index')
            ->with('message', 'Receita criada com sucesso!');
    }

    public function edit(Recipe $recipe)
    {
        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe
        ]);
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

        return redirect()->route('recipes.index')
            ->with('message', 'Receita atualizada com sucesso!');
    }

    public function destroy(Recipe $recipe)
    {
        $this->authorize('delete', $recipe);
        
        $recipe->delete();

        return redirect()->route('recipes.index')
            ->with('message', 'Receita excluída com sucesso!');
    }
}
