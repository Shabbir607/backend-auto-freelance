<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenWebUIService
{
    /**
     * Normal chat completion (non-stream)
     */
    public function chat(string $prompt): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.openwebui.key'),
            'Content-Type'  => 'application/json',
        ])->post(config('services.openwebui.url'), [
            'model'    => config('services.openwebui.model'),
            'stream'   => false,
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ],
        ]);

        return $response->json();
    }


    /**
     * Streaming chat completion
     */
    public function stream(string $prompt)
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.openwebui.key'),
            'Content-Type'  => 'application/json',
        ])->withOptions([
            'stream' => true,
        ])->post(config('services.openwebui.url'), [
            'model'    => config('services.openwebui.model'),
            'stream'   => true,
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ],
        ]);
    }
}
