<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class R24hQuestionnaireItem extends Model
{
    use HasFactory;

    protected $fillable = ['r24h_questionnaire_section_id', 'field_name', 'field_type', 'order'];

    public function section(): BelongsTo
    {
        return $this->belongsTo(R24hQuestionnaireSection::class, 'r24h_questionnaire_section_id');
    }
}