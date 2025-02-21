<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class CheckAdminPermissions extends Command
{
    protected $signature = 'check:admin-permissions';
    protected $description = 'Check the permissions assigned to the admin user';

    public function handle()
    {
        $admin = User::where('email', 'admin@example.com')->first();

        if ($admin) {
            $this->info('Admin User: ' . $admin->name);
            $this->info('Roles: ' . implode(', ', $admin->getRoleNames()->toArray()));
            $this->info('Permissions: ' . implode(', ', $admin->getAllPermissions()->pluck('name')->toArray()));
        } else {
            $this->error('Admin user not found.');
        }
    }
}
