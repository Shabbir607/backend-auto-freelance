<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class LessonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $lessonId = $this->route('lesson') ? $this->route('lesson')->id : null;

        return [
            'module_id' => 'required|exists:modules,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:lessons,slug,' . $lessonId,
            'video_url' => 'nullable|string|max:255',
            'video' => 'nullable|file|mimetypes:video/mp4,video/mpeg,video/quicktime,video/x-msvideo,video/x-flv,video/webm|max:512000',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'text_content' => 'nullable|string',
            'is_free_preview' => 'boolean',
            'order' => 'integer|min:0',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string|max:255',
            'seo_meta_tags' => 'nullable|string',
            'og_image' => 'nullable|string|max:255',
            'seo_canonical_url' => 'nullable|url|max:255',
        ];
    }
}
