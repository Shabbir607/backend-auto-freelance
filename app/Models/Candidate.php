<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Candidate extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['full_address'];

    protected $casts = [
        'date_of_birth' => 'datetime',
        'allow_in_search' => 'boolean',
    ];

    public function getPhotoAttribute($photo)
    {
        if ($photo == null) {
            return asset('backend/image/default.png');
        } else {
            return asset($photo);
        }
    }

    public function getFullAddressAttribute()
    {
        // $country = $this->country;
        // $region = $this->region;
        // $extra = $region != null ? ' , ' : '';
        // return $region.$extra.$country;
        return '';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function appliedJobs()
    {
        return $this->belongsToMany(JobPost::class, 'applied_jobs', 'candidate_id', 'job_id')->withTimestamps();
    }

    public function jobRole()
    {
        return $this->belongsTo(JobRole::class, 'role_id');
    }

    public function experience()
    {
        return $this->belongsTo(Experience::class, 'experience_id');
    }

    public function education()
    {
        return $this->belongsTo(Education::class, 'education_id');
    }

    public function profession()
    {
        return $this->belongsTo(Profession::class, 'profession_id');
    }
}
