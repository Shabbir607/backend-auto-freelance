<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserDetail extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'uuid', 
        'user_id',
        'company_name',
        'job_title',
        'bio',
        'phone_number',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'postal_code',
        'country',
        'avatar_url',
        'timezone',
        'language',
        'last_login_at',
        'last_login_ip',
        'email_verified_at',
        'website_url',
        'linkedin_url',
        'facebook_url',
        'twitter_url',
        'first_name',
        'last_name',
        'hourly_rate',
        'availability',
        'github_url',
        'payment_info',
        'notification_preferences',
        'privacy_settings',
        'location',
    ];

    /**
     * Attribute casting for dates.
     */
    protected $casts = [
        'last_login_at' => 'datetime',
        'email_verified_at' => 'datetime',
        'payment_info' => 'array',
        'notification_preferences' => 'array',
        'privacy_settings' => 'array',
    ];

    /**
     * Boot method to generate UUID automatically.
     */
    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    /**
     * Relationship: a user detail belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
