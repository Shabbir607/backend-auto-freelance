<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'title',
        'slug',
        'video_url',
        'thumbnail',
        'text_content',
        'is_free_preview',
        'order',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'seo_meta_tags',
        'og_image',
        'seo_canonical_url',
    ];

    protected $casts = [
        'is_free_preview' => 'boolean',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function resources()
    {
        return $this->hasMany(LessonResource::class);
    }
}
