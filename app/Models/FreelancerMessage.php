<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FreelancerMessage extends Model
{
    use HasFactory;

    protected $table = 'freelancer_messages';

    protected $fillable = [
        'freelancer_thread_id',
        'freelancer_message_id',
        'freelancer_sender_id',
        'body',
        'attachments',
        'sent_at',
        'is_read',
    ];

    protected $casts = [
        'attachments' => 'array',
        'sent_at' => 'datetime',
        'is_read' => 'boolean',
    ];

    public function thread()
    {
        return $this->belongsTo(FreelancerThread::class, 'freelancer_thread_id');
    }
}
