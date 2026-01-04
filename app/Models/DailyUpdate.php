<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'user_id',
        'content',
        'attachments',
        'date',
    ];

    protected $casts = [
        'attachments' => 'array',
        'date' => 'date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
