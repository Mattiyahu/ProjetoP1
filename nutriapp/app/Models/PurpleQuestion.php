<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurpleQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['question_text', 'answer_options', 'question_type'];
    protected $casts = [
        'answer_options' => 'array', // Para trabalhar com JSON como array
    ];
}