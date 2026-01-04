<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'plan',
        'admin_id',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function members()
    {
        return $this->hasMany(User::class, 'team_id');
    }

    public function channels()
    {
        return $this->hasMany(Channel::class);
    }

    public function invitations()
    {
        return $this->hasMany(TeamInvitation::class);
    }
}
