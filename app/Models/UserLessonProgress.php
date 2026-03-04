<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLessonProgress extends Model
{
    use HasFactory;

    protected $table = 'user_lesson_progress';

    protected $fillable = [
        'ip_address',
        'lesson_id',
        'watched_percentage',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    // Removed user relationship as tracking is IP-based

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
