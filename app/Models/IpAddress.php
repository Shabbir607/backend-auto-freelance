<?php

namespace App\Models;
use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Model;

class IpAddress extends Model
{
    protected $fillable = [
        'uuid','user_id','ip_address','type','provider','location','is_active','is_assigned','username','password','port','assigned_at'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_assigned' => 'boolean',
        'assigned_at' => 'datetime',
    ];

    protected static function booted() {
        static::creating(fn($model) => $model->uuid = Str::uuid());
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function platformAccount() {
        return $this->hasOne(PlatformAccount::class,'ip_id');
    }
}
