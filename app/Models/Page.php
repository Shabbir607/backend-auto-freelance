<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_tags',
        'og_image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'meta_tags' => 'array',
    ];

    /**
     * Get the FAQs for the page.
     */
    public function faqs()
    {
        return $this->morphMany(Faq::class, 'faqable');
    }
}
