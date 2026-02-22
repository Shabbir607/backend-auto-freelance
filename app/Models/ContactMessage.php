<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'is_read',
        'reply_status',
        'reply_message',
        'replied_at',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'reply_status' => 'boolean',
        'replied_at' => 'datetime',
    ];
}
