<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'google_token',
        'google_refresh_token',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'activity_level',
        'dietary_restrictions',
        'health_conditions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google_token',
        'google_refresh_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'dietary_restrictions' => 'array',
        'health_conditions' => 'array',
    ];

    /**
     * Get the purple question answers for the user.
     */
    public function purpleQuestionAnswers(): HasMany
    {
        return $this->hasMany(PurpleQuestionAnswer::class);
    }

    /**
     * Get the food tracking answers for the user.
     */
    public function foodTrackingAnswers(): HasMany
    {
        return $this->hasMany(FoodTrackingAnswer::class);
    }

    /**
     * Get the R24H questionnaire answers for the user.
     */
    public function r24hQuestionnaireAnswers(): HasMany
    {
        return $this->hasMany(R24hQuestionnaireAnswer::class);
    }

    /**
     * Get the recipes for the user.
     */
    public function recipes(): HasMany
    {
        return $this->hasMany(Recipe::class);
    }

    /**
     * Get the educational contents for the user.
     */
    public function educationalContents(): HasMany
    {
        return $this->hasMany(EducationalContent::class);
    }

    /**
     * Create a new personal access token for the user.
     */
    public function createToken(string $name, array $abilities = ['*'])
    {
        $token = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken = \Illuminate\Support\Str::random(40)),
            'abilities' => $abilities,
        ]);

        return new \Laravel\Sanctum\NewAccessToken($token, $token->getKey().'|'.$plainTextToken);
    }
}
