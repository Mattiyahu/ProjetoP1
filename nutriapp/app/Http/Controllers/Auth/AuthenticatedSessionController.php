<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Generate Sanctum token for API authentication
        $token = $request->user()->createToken('auth-token')->plainTextToken;
        session(['token' => $token]);

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        try {
            // Get the current user
            $user = $request->user();

            if ($user) {
                // Delete all tokens for the user
                $user->tokens()->delete();
            }

            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

        } catch (\Exception $e) {
            // Log the error but continue with logout
            Log::error('Error during logout: ' . $e->getMessage());
        }

        return redirect('/');
    }
}
