<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Permission\Traits\HasRoles;

class Recipe extends Model
{
    use HasFactory, HasRoles;

    protected $fillable = [
        'title',
        'description',
        'ingredients',
        'instructions',
        'preparation_time',
        'difficulty_level',
        'image_url',
        'user_id',
        'content'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'ingredients' => 'array',
        'content' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the user can manage this recipe
     */
    public function canManage(User $user): bool
    {
        return $user->id === $this->user_id || $user->hasRole(['admin', 'nutritionist']);
    }
}
