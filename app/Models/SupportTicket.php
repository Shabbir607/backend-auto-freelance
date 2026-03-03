<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    protected $fillable = [
        'session_token',
        'name',
        'email',
        'subject',
        'status',
        'closed_at',
    ];

    protected $casts = [
        'closed_at' => 'datetime',
    ];

    /**
     * Get all messages for this ticket.
     */
    public function messages()
    {
        return $this->hasMany(SupportMessage::class, 'ticket_id')->orderBy('created_at', 'asc');
    }

    /**
     * Get unread admin messages count.
     */
    public function unreadAdminMessages()
    {
        return $this->hasMany(SupportMessage::class, 'ticket_id')
            ->where('sender', 'admin');
    }
}
