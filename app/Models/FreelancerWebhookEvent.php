<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FreelancerWebhookEvent extends Model
{
protected $guarded = [];
    protected $casts = ['payload' => 'array'];

    public function account()
    {
        return $this->belongsTo(PlatformAccount::class, 'platform_account_id');
    }
}
