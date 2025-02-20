<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';

    protected $fillable = [
        'name',
        'serving_size',
        'calories',
        'protein',
        'carbohydrates',
        'fat',
        // Adicione outros atributos fillable se adicionar mais nutrientes
    ];
}