<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Create the admin user
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin'), // Password is 'admin'
        ]);

        // Assign the admin role
        $adminRole = Role::findByName('admin');
        $admin->assignRole($adminRole);
    }
}
