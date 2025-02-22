<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Session;

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
        $permissions = [];

        if ($user) {
            $token = $user->tokens()->latest()->first()?->plainTextToken ?? session('token');
            $permissions = $user->getAllPermissions()->pluck('name');
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? array_merge($user->toArray(), ['permissions' => $permissions]) : null,
                'token' => $token,
            ],
            'csrf_token' => csrf_token(),
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'ziggy' => [
                'url' => $request->getBaseUrl()
            ],
            'routes' => [
                'purple-questions' => route('purple-questions'),
                'food-tracking' => route('food-tracking'),
                'r24h-questionnaire' => route('r24h-questionnaire'),
                'educational.content.index' => route('educational.content.index'),
                'recipes.index' => route('recipes.index'),
            ],
        ]);
    }
}
