<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $token = null;

        if ($user) {
            // Delete existing tokens and create a new one
            $user->tokens()->delete();
            $token = $user->createToken('auth-token')->plainTextToken;
            session(['token' => $token]);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'token' => $token ?? session('token'),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ];
    }
}
