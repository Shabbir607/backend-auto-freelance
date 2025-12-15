<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PlatformAccount extends Model
{
    protected $fillable = [
        'uuid','user_id','platform_id','ip_id','account_username','account_email','external_account_id',
        'oauth_access_token','oauth_refresh_token','token_expires_at','session_cookie',
        'status','verified','last_sync_at','last_error'
    ];

    protected $casts = [
        'verified'=>'boolean',
        'token_expires_at'=>'datetime',
        'last_sync_at'=>'datetime'
    ];

    protected static function booted() {
        static::creating(fn($model)=>$model->uuid = Str::uuid());
    }

    public function user() { return $this->belongsTo(User::class); }
    public function platform() { return $this->belongsTo(Platform::class); }
    public function ipAddress() { return $this->belongsTo(IpAddress::class,'ip_id'); }
    public function audits() { return $this->hasMany(AccountAudit::class); }
}
