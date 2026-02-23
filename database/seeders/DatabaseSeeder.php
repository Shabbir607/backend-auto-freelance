<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // -----------------------------------
        // 1. Seed Roles & Permissions first
        // -----------------------------------
        $this->call([
            RolesAndPermissionsSeeder::class,
            AdminUserSeeder::class,
        ]);

        // -----------------------------------
        // 2. Create a Test User (optional)
        // -----------------------------------
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'), // default password
        ]);

        // -----------------------------------
        // 3. Optionally create more test users
        // -----------------------------------
        User::factory(5)->create(); // random users

        $this->command->info('Database seeded successfully with roles, permissions, and users.');
    }
}
