<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ------------------------------
        // 1. Create Permissions
        // ------------------------------
        $permissions = [
            'manage users',
            'manage projects',
            'view projects',
            'create proposals',
            'submit proposals',
            'assign roles',
            'update projects',
            'delete projects',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // ------------------------------
        // 2. Create Roles
        // ------------------------------
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions(Permission::all()); // Admin gets all permissions

        $userRole = Role::firstOrCreate(['name' => 'user']);
        $userRole->syncPermissions([
            'view projects',
            'create proposals',
            'submit proposals'
        ]);

        // ------------------------------
        // 3. Create Default Admin User
        // ------------------------------
        $adminEmail = 'admin@auto-freelancing.com';
        $adminPassword = 'Admin1234';

        $adminUser = User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Super Admin',
                'password' => Hash::make($adminPassword)
            ]
        );

        if (!$adminUser->hasRole('admin')) {
            $adminUser->assignRole('admin');
        }

        // ------------------------------
        // 4. Example: Create a default normal user
        // ------------------------------
        $userEmail = 'user@auto-freelancing.com';
        $userPassword = 'User1234';

        $user = User::firstOrCreate(
            ['email' => $userEmail],
            [
                'name' => 'Default User',
                'password' => Hash::make($userPassword)
            ]
        );

        if (!$user->hasRole('user')) {
            $user->assignRole('user');
        }

        $this->command->info('Roles, permissions, and default users created successfully!');
    }
}
