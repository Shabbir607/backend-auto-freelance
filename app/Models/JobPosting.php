<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    protected $fillable = [
        'title',
        'description',
        'budget',
        'user_id',
        'status',
        'skills_required',
    ];

    protected $casts = [
        'skills_required' => 'array',
        'budget' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
