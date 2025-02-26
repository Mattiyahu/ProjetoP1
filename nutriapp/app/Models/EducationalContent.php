<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;

class EducationalContent extends Model
{
    use HasFactory, HasRoles;

    protected $fillable = [
        'title',
        'slug',
        'body',
        'content_type',
        'user_id',
        'status',
        'metadata'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'metadata' => 'array',
    ];

    /**
     * Boot the model.
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($content) {
            $content->slug = Str::slug($content->title);
        });

        static::updating(function ($content) {
            $content->slug = Str::slug($content->title);
        });
    }

    /**
     * Get the user that owns the educational content.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the user can manage this content
     */
    public function canManage(User $user): bool
    {
        return $user->id === $this->user_id || $user->hasRole(['admin', 'nutritionist']);
    }
}
