<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'video_url' => $this->video_url,
            'thumbnail' => $this->thumbnail,
            'text_content' => $this->text_content,
            'is_free_preview' => $this->is_free_preview,
            'order' => $this->order,
            'seo' => [
                'title' => $this->seo_title,
                'description' => $this->seo_description,
                'keywords' => $this->seo_keywords,
                'meta_tags' => $this->seo_meta_tags,
                'og_image' => $this->og_image,
                'canonical_url' => $this->seo_canonical_url,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
