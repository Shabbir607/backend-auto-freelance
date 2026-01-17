<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\JobCategory;
use App\Models\JobRole;
use App\Models\Experience;
use App\Models\Education;
use App\Models\JobType;
use App\Models\SalaryType;
use App\Models\IndustryType;
use App\Models\OrganizationType;
use App\Models\TeamSize;
use App\Models\Nationality;
use App\Models\Profession;

class JobBoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Job Categories
        $categories = ['Development', 'Design', 'Marketing', 'Sales', 'Support'];
        foreach ($categories as $cat) {
            JobCategory::firstOrCreate(['slug' => Str::slug($cat)], ['name' => $cat]);
        }

        // Job Roles
        $roles = ['Backend Developer', 'Frontend Developer', 'UI/UX Designer', 'Project Manager'];
        foreach ($roles as $role) {
            JobRole::firstOrCreate(['slug' => Str::slug($role)], ['name' => $role]);
        }

        // Experience
        $experiences = ['Fresh', '1-2 Years', '3-5 Years', '5+ Years'];
        foreach ($experiences as $exp) {
            Experience::firstOrCreate(['slug' => Str::slug($exp)], ['name' => $exp]);
        }

        // Education
        $educations = ['High School', 'Bachelor', 'Master', 'PhD'];
        foreach ($educations as $edu) {
            Education::firstOrCreate(['slug' => Str::slug($edu)], ['name' => $edu]);
        }

        // Job Types
        $types = ['Full Time', 'Part Time', 'Contract', 'Freelance'];
        foreach ($types as $type) {
            JobType::firstOrCreate(['slug' => Str::slug($type)], ['name' => $type]);
        }

        // Salary Types
        $salaries = ['Monthly', 'Project Based', 'Hourly', 'Yearly'];
        foreach ($salaries as $salary) {
            SalaryType::firstOrCreate(['slug' => Str::slug($salary)], ['name' => $salary]);
        }

        // Industry Types
        $industries = ['Software', 'Finance', 'Health', 'Education'];
        foreach ($industries as $ind) {
            IndustryType::firstOrCreate(['slug' => Str::slug($ind)], ['name' => $ind]);
        }

        // Organization Types
        $orgTypes = ['Private Company', 'Government', 'NGO'];
        foreach ($orgTypes as $org) {
            OrganizationType::firstOrCreate(['slug' => Str::slug($org)], ['name' => $org]);
        }

        // Team Sizes
        $sizes = ['1-10', '11-50', '51-200', '201+'];
        foreach ($sizes as $size) {
            TeamSize::firstOrCreate(['slug' => Str::slug($size)], ['name' => $size]);
        }
        
         // Nationalities
        $nations = ['United States', 'United Kingdom', 'Canada', 'India', 'Pakistan'];
        foreach ($nations as $nation) {
            Nationality::firstOrCreate(['slug' => Str::slug($nation)], ['name' => $nation]);
        }
        
        // Professions
         $professions = ['Software Engineer', 'Designer', 'Writer', 'Manager'];
        foreach ($professions as $prof) {
            Profession::firstOrCreate(['slug' => Str::slug($prof)], ['name' => $prof]);
        }
    }
}
