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
            Log::info('Google user data received', ['email' => $googleUser->getEmail()]);
            
            // Procura um usuário pelo email do Google
            $existingUser = User::where('email', $googleUser->getEmail())->first();
            Log::debug('User lookup result', ['exists' => $existingUser !== null]);
            
            if ($existingUser) {
                // Se o usuário existe, atualiza as informações do Google
                $existingUser->update([
                    'google_id' => $googleUser->getId(),
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                ]);
                
                Log::info('Updating existing user with Google data', ['user_id' => $existingUser->id]);
                $user = $existingUser;
            } else {
                // Se o usuário não existe, cria um novo
                Log::info('Creating new user with Google data', ['email' => $googleUser->getEmail()]);
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => Str::random(20),
                    'google_id' => $googleUser->getId(),
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                ]);
            }

            // Regenerate session to prevent session fixation
            request()->session()->invalidate();
            request()->session()->regenerateToken();
            
            // Log in the user and save session
            Auth::login($user, true);
            request()->session()->save();
            
            // Verify authentication status
            if (!Auth::check()) {
                Log::error('Authentication failed after login attempt', ['user_id' => $user->id]);
                throw new \Exception('Authentication failed');
            }
            Log::info('User authenticated successfully', ['user_id' => $user->id]);

            // Redirect to dashboard with success message
            // Ensure session is properly saved before redirect
            request()->session()->save();
            
            return redirect('/dashboard')
                ->with('status', 'Login successful!')
                ->withHeaders(['Cache-Control' => 'no-store, must-revalidate']);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Google OAuth Error: ' . $e->getMessage());
            
            return redirect()->route('login')
                ->withErrors(['google' => 'Ocorreu um erro ao fazer login com o Google. Por favor, tente novamente.']);
        }
    }
}
