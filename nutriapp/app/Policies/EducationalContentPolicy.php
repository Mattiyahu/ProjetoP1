<?php

namespace App\Policies;

use App\Models\User;
use App\Models\EducationalContent;
use Illuminate\Auth\Access\HandlesAuthorization;

class EducationalContentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('professional');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, EducationalContent $content): bool
    {
        return $user->hasRole('admin') || $user->hasRole('professional');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('professional');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, EducationalContent $content): bool
    {
        return $user->hasRole('admin') || 
               ($user->hasRole('professional') && $content->user_id === $user->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, EducationalContent $content): bool
    {
        return $user->hasRole('admin') || 
               ($user->hasRole('professional') && $content->user_id === $user->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, EducationalContent $content): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, EducationalContent $content): bool
    {
        return $user->hasRole('admin');
    }
}
