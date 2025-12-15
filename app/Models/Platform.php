<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Platform extends Model
{
      protected $fillable = [
        'uuid','name','slug','api_base_url','auth_method','logo_url','description','is_active'
    ];

    protected static function booted() {
        static::creating(fn($model) => $model->uuid = Str::uuid());
    }

    public function accounts() {
        return $this->hasMany(PlatformAccount::class);
    }
}
