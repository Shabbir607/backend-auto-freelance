<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Jobs\SyncFreelancerThreads;
use App\Models\PlatformAccount;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {
    $accounts = PlatformAccount::whereHas('platform', fn($q) => $q->where('slug', 'freelancer'))->get();
    foreach ($accounts as $account) {
        SyncFreelancerThreads::dispatch($account);
    }
})->everyTenMinutes();

Schedule::command('n8n:import-workflows')->hourly()->withoutOverlapping();
