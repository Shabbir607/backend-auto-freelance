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
            // Blog Permissions
            'view blog',
            'create blog',
            'edit blog',
            'delete blog',
            'publish blog',

            // Job Permissions
            'view jobs',
            'create job',
            'edit job',
            'delete job',
            'publish job',
            'apply for job',
            'view applicants',
            'manage jobs', // General management

            // Interview Permissions
            'view interview',
            'schedule interview',
            'cancel interview',
            'conduct interview',

            // Profile & Account Permissions
            'view profile',
            'edit profile',
            'delete account',
            'manage profile', // General management

            // System & Admin Permissions
            'access admin panel',
            'manage users',
            'manage settings',
            'view logs',
            'manage roles',
            'manage permissions',

            // Legacy / Granular Mappings (Optional but kept for safety)
            'post_project',
            'bid_on_project',
            'hire_freelancer',
            'manage_freelancer',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // ------------------------------
        // 2. Create Roles & Assign Permissions
        // ------------------------------

        // --- Freelancer Role ---
        $freelancerRole = Role::firstOrCreate(['name' => 'freelancer']);
        $freelancerRole->syncPermissions([
            // Jobs
            'view jobs',
            'apply for job',
            'bid_on_project',
            // Interviews
            'view interview',
            // Profile
            'view profile',
            'edit profile',
            'manage profile',
            // Blog
            'view blog',
        ]);

        // --- Client Role ---
        $clientRole = Role::firstOrCreate(['name' => 'client']);
        $clientRole->syncPermissions([
            // Jobs
            'view jobs',
            'create job',
            'edit job',
            'delete job',
            'view applicants',
            'manage jobs',
            'post_project',
            'hire_freelancer',
            // Interviews
            'view interview',
            'schedule interview',
            'cancel interview',
            // Profile
            'view profile',
            'edit profile',
            'manage profile',
            // Blog
            'view blog',
        ]);

        // --- Agency Role ---
        // Agencies act like super-clients with team management capabilities
        $agencyRole = Role::firstOrCreate(['name' => 'agency']);
        $agencyRole->syncPermissions([
            // Jobs
            'view jobs',
            'create job',
            'edit job',
            'delete job',
            'view applicants',
            'manage jobs',
            'post_project',
            'hire_freelancer',
            'manage_freelancer',
            // Interviews
            'view interview',
            'schedule interview',
            'cancel interview',
            'conduct interview',
            // Profile
            'view profile',
            'edit profile',
            'manage profile',
            // Blog
            'view blog',
            'create blog', // Agencies might contribute content
        ]);

        // --- Admin Role ---
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions(Permission::all());

        // ------------------------------
        // 3. Create Default Users
        // ------------------------------
        
        // Admin
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@auto-freelancing.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Admin1234')
            ]
        );
        $adminUser->assignRole($adminRole);

        // Agency User
        $agencyUser = User::firstOrCreate(
            ['email' => 'agency@auto-freelancing.com'],
            [
                'name' => 'Demo Agency',
                'password' => Hash::make('Agency1234')
            ]
        );
        $agencyUser->assignRole($agencyRole);

        // Freelancer User
        $freelancerUser = User::firstOrCreate(
            ['email' => 'freelancer@auto-freelancing.com'],
            [
                'name' => 'Demo Freelancer',
                'password' => Hash::make('Freelancer1234')
            ]
        );
        $freelancerUser->assignRole($freelancerRole);
        
        // Client User
        $clientUser = User::firstOrCreate(
            ['email' => 'client@auto-freelancing.com'],
            [
                'name' => 'Demo Client',
                'password' => Hash::make('Client1234')
            ]
        );
        $clientUser->assignRole($clientRole);

        $this->command->info('Comprehensive production roles and permissions created successfully!');
    }
}
