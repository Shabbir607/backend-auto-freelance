<?php

namespace App\Services;

use App\Models\Prompt;
use Illuminate\Support\Facades\Cache;

class PromptService
{
    /**
     * Get a prompt by key, optionally replacing placeholders.
     *
     * @param string $key
     * @param array $replacements Key-value pairs to replace in the prompt content. e.g. ['name' => 'John']
     * @return string
     * @throws \Exception
     */
    public function get(string $key, array $replacements = []): string
    {
        // Cache prompts for performance (1 hour)
        $prompt = Cache::remember("prompt:{$key}", 3600, function () use ($key) {
            return Prompt::where('key', $key)->where('is_active', true)->first();
        });

        if (!$prompt) {
            // Fallback or throw exception? For now, throw.
            throw new \Exception("Prompt with key '{$key}' not found or inactive.");
        }

        $content = $prompt->content;

        foreach ($replacements as $placeholder => $value) {
            $content = str_replace("{{{$placeholder}}}", $value, $content);
        }

        return $content;
    }

    /**
     * Create or update a prompt.
     */
    public function update(string $key, string $content, ?string $description = null, ?string $model = null): Prompt
    {
        $prompt = Prompt::updateOrCreate(
            ['key' => $key],
            [
                'content' => $content,
                'description' => $description,
                'model' => $model,
                'is_active' => true,
            ]
        );

        Cache::forget("prompt:{$key}");

        return $prompt;
    }
}
