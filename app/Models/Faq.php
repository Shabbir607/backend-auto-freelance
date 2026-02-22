<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
        'faqable_id',
        'faqable_type',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'status' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the parent faqable model (user, post, etc.).
     */
    public function faqable()
    {
        return $this->morphTo();
    }
}
