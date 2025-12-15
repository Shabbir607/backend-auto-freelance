<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FreelancerThread extends Model
{
    use HasFactory;

    protected $table = 'freelancer_threads';

    protected $fillable = [
        'user_id',
        'platform_account_id',
        'freelancer_thread_id',
        'participants',
        'context_type',
        'context_id',
        'last_message_at',
        'is_archived',
        'is_muted',
        'metadata',
    ];

    protected $casts = [
        'participants' => 'array',
        'metadata' => 'array',
        'is_archived' => 'boolean',
        'is_muted' => 'boolean',
        'last_message_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function platformAccount()
    {
        return $this->belongsTo(PlatformAccount::class);
    }

    public function messages()
    {
        return $this->hasMany(FreelancerMessage::class);
    }
}
