<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'client_id',
        'name',
        'description',
        'status',
        'priority',
        'platform',
        'start_date',
        'end_date',
        'budget',
        'freelancer_project_id',
        'owner_id',
        'seo_url',
        'currency',
        'submitdate',
        'preview_description',
        'deleted',
        'nonpublic',
        'hidebids',
        'type',
        'bidperiod',
        'hourly_project_info',
        'featured',
        'urgent',
        'bid_stats',
        'time_submitted',
        'time_updated',
        'upgrades',
        'qualifications',
        'language',
        'attachments',
        'hireme',
        'frontend_project_status',
        'location',
        'local',
        'negotiated',
        'time_free_bids_expire',
        'files',
        'pool_ids',
        'enterprise_ids',
        'is_escrow_project',
        'is_seller_kyc_required',
        'is_buyer_kyc_required',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'budget' => 'decimal:2',
        'currency' => 'array',
        'hourly_project_info' => 'array',
        'bid_stats' => 'array',
        'upgrades' => 'array',
        'qualifications' => 'array',
        'attachments' => 'array',
        'location' => 'array',
        'files' => 'array',
        'pool_ids' => 'array',
        'enterprise_ids' => 'array',
        'deleted' => 'boolean',
        'nonpublic' => 'boolean',
        'hidebids' => 'boolean',
        'featured' => 'boolean',
        'urgent' => 'boolean',
        'hireme' => 'boolean',
        'local' => 'boolean',
        'negotiated' => 'boolean',
        'is_escrow_project' => 'boolean',
        'is_seller_kyc_required' => 'boolean',
        'is_buyer_kyc_required' => 'boolean',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user')->withPivot('role')->withTimestamps();
    }

    public function tasks()
    {
        return $this->hasMany(ProjectTask::class);
    }

    public function updates()
    {
        return $this->hasMany(DailyUpdate::class);
    }

    public function files()
    {
        return $this->hasMany(ProjectFile::class);
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function milestones()
    {
        return $this->hasMany(Milestone::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
