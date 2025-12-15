<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountAudit extends Model
{
     protected $fillable = [
        'platform_account_id','user_id','action','description','old_value','new_value','performed_by','ip_origin'
    ];

    public $timestamps = false;

    protected $casts = ['created_at'=>'datetime'];

    public function account() { return $this->belongsTo(PlatformAccount::class,'platform_account_id'); }
    public function user() { return $this->belongsTo(User::class); }
}
