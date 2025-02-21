<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodTrackingAnswer extends Model
{
    protected $fillable = [
        'user_id',
        'food_tracking_question_id',
        'answer',
        'tracking_date'
    ];

    protected $casts = [
        'tracking_date' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function question()
    {
        return $this->belongsTo(FoodTrackingQuestion::class, 'food_tracking_question_id');
    }
}
