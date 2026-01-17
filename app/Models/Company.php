<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['logo_url', 'banner_url', 'full_address'];

    protected $casts = [
        'establishment_date' => 'datetime',
        'profile_completion' => 'boolean',
        'is_profile_verified' => 'boolean',
    ];

    public function getFullAddressAttribute()
    {
        // $country = $this->country;
        // $region = $this->region;
        // $extra = $region != null ? ' , ' : '';
        // return $region.$extra.$country;
        return '';
    }

    public function getLogoUrlAttribute()
    {
        if (! $this->logo) {
            return asset('backend/image/default.png');
        }

        return asset($this->logo);
    }

    public function getBannerUrlAttribute()
    {
        if (! $this->banner) {
            return asset('backend/image/default.png');
        }

        return asset($this->banner);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(JobPost::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(OrganizationType::class, 'organization_type_id');
    }

    public function industry(): BelongsTo
    {
        return $this->belongsTo(IndustryType::class, 'industry_type_id');
    }

    public function team_size()
    {
        return $this->belongsTo(TeamSize::class, 'team_size_id', 'id');
    }
}
