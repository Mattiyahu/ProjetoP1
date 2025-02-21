<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        try {
            return Socialite::driver('google')->redirect();
        } catch (\Exception $e) {
            Log::error('Google OAuth Redirect Error: ' . $e->getMessage());
            return redirect()->route('login')
                ->withErrors(['google' => 'Erro ao conectar com o Google. Por favor, tente novamente.']);
        }
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Log dos dados recebidos do Google
            Log::info('Google user data received, refresh token:', [
                'refresh_token' => $googleUser->refreshToken ?? null,
                'email' => $googleUser->getEmail(),
                'id' => $googleUser->getId(),
                'token' => $googleUser->token,
                'refresh_token' => $googleUser->refreshToken ?? null
            ]);
            
            // Procura um usuário pelo email ou google_id
            $existingUser = User::where('email', $googleUser->getEmail())
                ->orWhere('google_id', $googleUser->getId())
                ->first();

            if ($existingUser) {
                // Atualiza as informações do Google
$existingUser->forceFill([
    'google_id' => $googleUser->getId(),
    'google_token' => $googleUser->token,
    'google_refresh_token' => $googleUser->refreshToken // Ensure refresh token is saved
                ])->save();
                
                Log::info('Updating existing user with Google data', ['user_id' => $existingUser->id]);
                $user = $existingUser;
            } else {
                // Cria um novo usuário
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => Str::random(20),
                    'google_id' => $googleUser->getId(),
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken ?? null
                ]);
            }

            // Store token in session for frontend access
            session(['token' => $user->createToken('google-auth-token')->plainTextToken]);
            Log::info('Token stored in session', ['token' => session('token')]);
            request()->session()->save();
            
            Auth::login($user, true);
            return redirect('/dashboard')
                ->with('status', 'Login successful!')
                ->withHeaders(['Cache-Control' => 'no-store, must-revalidate']);
        } catch (\Exception $e) {
            Log::error('Google OAuth Error: ' . $e->getMessage());
            return redirect()->route('login')
                ->withErrors(['google' => 'Ocorreu um erro ao fazer login com o Google. Por favor, tente novamente.']);
        }
    }
}