<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Channel extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'team_id',
        'name',
        'description',
        'is_private',
        'project_id',
        'created_by',
    ];

    protected $casts = [
        'is_private' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'channel_members', 'channel_id', 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(TeamMessage::class);
    }

    public function lastMessage()
    {
        return $this->hasOne(TeamMessage::class)->latestOfMany();
    }

    public function scopeDm($query)
    {
        return $query->where('type', 'dm');
    }

    public function scopeGroup($query)
    {
        return $query->where('type', 'group');
    }
}
