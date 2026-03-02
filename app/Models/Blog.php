<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // ✅ CORRECT PLACE

class Blog extends Model
{
    use HasFactory;

    protected $appends = ['image_url'];

    protected $fillable = [
        'category_id',
        'author_id',
        'title',
        'slug',
        'description',
        'content',
        'image',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'views',
        'is_featured',
        'status',
        'published_at',
    ];

    protected $casts = [
        'views' => 'integer',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function faqs()
    {
        return $this->morphMany(Faq::class, 'faqable');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        // Fix locally generated URLs stored in DB over time
        $url = $this->image;
        if (str_contains($url, 'localhost')) {
            $url = str_replace(['http://localhost', 'https://localhost'], 'https://api.edgelancer.com', $url);
        }

        // If it's already a full URL (starts with http:// or https://), return as is
        if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
            return $url;
        }

        // If it's a storage path, use the public disk explicitly attached to production domain
        return 'https://api.edgelancer.com/storage/' . ltrim($url, '/');
    }
}
