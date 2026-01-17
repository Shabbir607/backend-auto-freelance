<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class JobPost extends Model
{
    use HasFactory;

    protected $table = 'job_posts';

    protected $guarded = [];

    protected $appends = ['days_remaining', 'deadline_active', 'can_apply', 'full_address'];

    protected $casts = [
        'bookmarked' => 'boolean',
        'applied' => 'boolean',
        'can_apply' => 'boolean',
        'highlight_until' => 'date:Y-m-d',
        'featured_until' => 'date:Y-m-d',
    ];

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $value_slug = Str::slug($value);
        $is_exists = JobPost::where('slug', $value_slug)->where('id', '!=', $this->id)->exists();

        if ($is_exists) {
            $this->attributes['slug'] = $value_slug.'-'.time().'-'.uniqid();
        } else {
            $this->attributes['slug'] = $value_slug;
        }
    }

    public function getFullAddressAttribute()
    {
        // $country = $this->country; // Relationship not yet ported
        // $region = $this->region; // Relationship not yet ported
        // $extra = $region != null ? ' , ' : '';
        // return $region.$extra.$country;
        return '';
    }

    public function getDaysRemainingAttribute()
    {
        return \Carbon\Carbon::parse($this->deadline)->diffForHumans(null, true, true, 2);
    }

    public function getCanApplyAttribute()
    {
        return $this->apply_on === 'app';
    }

    public function getDeadlineActiveAttribute()
    {
        return \Carbon\Carbon::parse($this->deadline)->format('Y-m-d') >= \Carbon\Carbon::now()->toDateString();
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(JobCategory::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(JobRole::class, 'role_id');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function appliedJobs()
    {
        return $this->belongsToMany(Candidate::class, 'applied_jobs', 'job_id', 'candidate_id')->withTimestamps();
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

    public function job_type()
    {
        return $this->belongsTo(JobType::class, 'job_type_id');
    }

    public function salary_type()
    {
        return $this->belongsTo(SalaryType::class, 'salary_type_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'job_tag', 'job_id', 'tag_id');
    }

    public function benefits()
    {
        return $this->belongsToMany(Benefit::class, 'job_benefit', 'job_id', 'benefit_id');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'job_skills', 'job_id', 'skill_id');
    }
}
