<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str; // Importe a classe Str

class EducationalContent extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'body', 'content_type'];

    // Opcional: Gerar slug automaticamente ao salvar o modelo
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
}