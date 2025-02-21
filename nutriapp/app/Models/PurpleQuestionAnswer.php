<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurpleQuestionAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'purple_question_id',
        'answer'
    ];

    /**
     * Get the user that owns the answer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the question that this answer belongs to.
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(PurpleQuestion::class, 'purple_question_id');
    }
}
