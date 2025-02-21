<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodTrackingQuestion extends Model
{
    protected $fillable = [
        'question_text',
        'question_type',
        'category',
        'answer_options',
        'order'
    ];

    protected $casts = [
        'answer_options' => 'array'
    ];

    public function answers()
    {
        return $this->hasMany(FoodTrackingAnswer::class);
    }
}
