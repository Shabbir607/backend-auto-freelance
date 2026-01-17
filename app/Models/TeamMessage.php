<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class TeamMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'channel_id',
        'user_id',
        'content',
        'attachments',
        'reactions',
        'is_edited',
        'parent_message_id',
    ];

    protected $casts = [
        'attachments' => 'array',
        'reactions' => 'array',
        'is_edited' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parentMessage()
    {
        return $this->belongsTo(TeamMessage::class, 'parent_message_id');
    }

    public function replies()
    {
        return $this->hasMany(TeamMessage::class, 'parent_message_id');
    }

    public function reactions()
    {
        return $this->hasMany(MessageReaction::class, 'team_message_id');
    }
}
