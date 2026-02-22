<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkflowReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'workflow_id',
        'user_id',
        'name',
        'email',
        'rating',
        'comment',
        'is_verified',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_verified' => 'boolean',
    ];

    public function workflow()
    {
        return $this->belongsTo(Workflow::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
