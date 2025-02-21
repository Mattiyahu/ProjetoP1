<?php

namespace App\Policies;

use App\Models\Recipe;
use App\Models\User;

class RecipePolicy
{
    /**
     * Determine whether the user can view any recipes.
     */
    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('view recipes');
    }

    /**
     * Determine whether the user can view the recipe.
     */
    public function view(User $user, Recipe $recipe)
    {
        return $user->hasPermissionTo('view recipes');
    }

    /**
     * Determine whether the user can create recipes.
     */
    public function create(User $user)
    {
        return $user->hasPermissionTo('create recipes');
    }

    /**
     * Determine whether the user can update the recipe.
     */
    public function update(User $user, Recipe $recipe)
    {
        return $user->hasPermissionTo('edit recipes') || $user->id === $recipe->user_id;
    }

    /**
     * Determine whether the user can delete the recipe.
     */
    public function delete(User $user, Recipe $recipe)
    {
        return $user->hasPermissionTo('delete recipes') || $user->id === $recipe->user_id;
    }
}
