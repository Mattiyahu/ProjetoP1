<?php

namespace App\Policies;

use App\Models\EducationalContent;
use App\Models\User;

class EducationalContentPolicy
{
    /**
     * Determine whether the user can view any educational contents.
     */
    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('view educational content');
    }

    /**
     * Determine whether the user can view the educational content.
     */
    public function view(User $user, EducationalContent $content)
    {
        return $user->hasPermissionTo('view educational content');
    }

    /**
     * Determine whether the user can create educational contents.
     */
    public function create(User $user)
    {
        return $user->hasPermissionTo('create educational content');
    }

    /**
     * Determine whether the user can update the educational content.
     */
    public function update(User $user, EducationalContent $content)
    {
        return $user->hasPermissionTo('edit educational content') || $user->id === $content->user_id;
    }

    /**
     * Determine whether the user can delete the educational content.
     */
    public function delete(User $user, EducationalContent $content)
    {
        return $user->hasPermissionTo('delete educational content') || $user->id === $content->user_id;
    }
}
