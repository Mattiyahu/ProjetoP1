<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Procura um usuário pelo email do Google
            $existingUser = User::where('email', $googleUser->getEmail())->first();
            
            if ($existingUser) {
                // Se o usuário existe, atualiza as informações do Google
                $existingUser->update([
                    'google_id' => $googleUser->getId(),
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                ]);
                
                $user = $existingUser;
            } else {
                // Se o usuário não existe, cria um novo
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => Str::random(20),
                    'google_id' => $googleUser->getId(),
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                ]);
            }

            Auth::login($user);

            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->with('error', 'Ocorreu um erro ao fazer login com o Google: ' . $e->getMessage());
        }
    }
}
