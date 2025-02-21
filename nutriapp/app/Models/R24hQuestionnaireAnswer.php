<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class R24hQuestionnaireAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'r24h_questionnaire_item_id',
        'answer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questionnaireItem()
    {
        return $this->belongsTo(R24hQuestionnaireItem::class, 'r24h_questionnaire_item_id');
    }
}
