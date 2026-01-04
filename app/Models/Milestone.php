<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'bidder_id',
        'amount',
        'reason',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function bidder()
    {
        return $this->belongsTo(User::class, 'bidder_id');
    }
}
