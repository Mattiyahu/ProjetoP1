<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => User::count(),
            'strapiUrl' => config('services.strapi.url', 'http://localhost:1337')
        ]);
    }

    public function users()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::with('roles')->paginate(10)
        ]);
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => [
                'strapi_url' => config('services.strapi.url'),
                'app_name' => config('app.name'),
            ]
        ]);
    }

    public function editUser($id)
    {
        $user = User::with('roles')->findOrFail($id);
        return Inertia::render('Admin/EditUser', [
            'user' => $user
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'role' => 'required|string|in:admin,professional master,professional,user',
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->syncRoles([$request->role]);
        $user->save();

        return redirect()->route('admin.users')->with('success', 'User updated successfully.');
    }
}
