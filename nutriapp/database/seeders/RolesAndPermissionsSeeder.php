<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for recipes
        Permission::create(['name' => 'create recipes']);
        Permission::create(['name' => 'edit recipes']);
        Permission::create(['name' => 'delete recipes']);
        Permission::create(['name' => 'view recipes']);

        // Create permissions for educational content
        Permission::create(['name' => 'create educational content']);
        Permission::create(['name' => 'edit educational content']);
        Permission::create(['name' => 'delete educational content']);
        Permission::create(['name' => 'view educational content']);

        // Create roles and assign permissions
        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo([
            'view recipes',
            'view educational content',
        ]);

        $nutritionistRole = Role::create(['name' => 'nutritionist']);
        $nutritionistRole->givePermissionTo([
            'create recipes',
            'edit recipes',
            'delete recipes',
            'view recipes',
            'create educational content',
            'edit educational content',
            'delete educational content',
            'view educational content',
        ]);

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());
    }
}
