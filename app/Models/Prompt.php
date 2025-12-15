<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prompt extends Model
{
    protected $fillable = [
        'key',
        'content',
        'description',
        'model',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
