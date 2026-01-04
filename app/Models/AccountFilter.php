<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountFilter extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform_account_id',
        'name',
        'filter_params',
        'is_active',
    ];

    protected $casts = [
        'filter_params' => 'array',
        'is_active' => 'boolean',
    ];

    public function account()
    {
        return $this->belongsTo(PlatformAccount::class, 'platform_account_id');
    }
}
