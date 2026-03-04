<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    protected $appends = ['average_rating', 'reviews_count'];

    public function modules()
    {
        return $this->hasMany(Module::class)->orderBy('order');
    }

    public function reviews()
    {
        return $this->hasMany(CourseReview::class);
    }

    public function approvedReviews()
    {
        return $this->hasMany(CourseReview::class)->where('is_approved', true);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function getAverageRatingAttribute()
    {
        return round($this->approvedReviews()->avg('rating') ?: 0, 1);
    }

    public function getReviewsCountAttribute()
    {
        return $this->approvedReviews()->count();
    }
}
