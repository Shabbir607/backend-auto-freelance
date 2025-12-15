<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiService
{
    public function run(string $provider, string $model, string $prompt, array $options = [])
    {
        return match ($provider) {
            'ollama' => $this->runOllama($model, $prompt, $options),
            'gemini' => $this->runGemini($model, $prompt, $options),
            'n8n'    => $this->runN8n($model, $prompt, $options),
            'openai' => $this->runOpenAi($model, $prompt, $options),
            'grok'   => $this->runGrok($model, $prompt, $options),
            default  => throw new \Exception("Unsupported AI provider: {$provider}"),
        };
    }

    protected function runN8n(string $model, string $prompt, array $options)
    {
        $url = config('services.n8n.webhook_url');

        if (empty($url)) {
            throw new \Exception('N8N Webhook URL is missing. Please set N8N_WEBHOOK_URL in .env');
        }

        // Default payload structure based on user request
        $payload = [
            'action' => 'sendMessage',
            'chatInput' => $prompt,
            'sessionId' => $options['sessionId'] ?? 'default_session',
            'model' => $model ?: 'ollama',
        ];

        // Merge any other options if needed, but prioritize the structure above
        // $payload = array_merge($payload, $options); 

        $response = Http::timeout(120)->post($url, $payload);

        if ($response->failed()) {
            Log::error('N8N Webhook Error', ['body' => $response->body()]);
            throw new \Exception('Failed to communicate with N8N Webhook.');
        }

        // Assuming the webhook returns the response text directly or in a specific field
        // The user didn't specify the response format, so we'll return the JSON or body.
        // For now, let's assume it returns JSON and we want the whole thing or a specific field.
        // If it returns a string, json() might fail or return null.
        
        $json = $response->json();
        return $json['output'] ?? $json['text'] ?? $json['response'] ?? $response->body();
    }

    protected function runOllama(string $model, string $prompt, array $options)
    {
        $host = config('services.ollama.host', 'http://ollama:11434');
        
        $response = Http::timeout(120)->post("{$host}/api/generate", [
            'model' => $model,
            'prompt' => $prompt,
            'stream' => false,
            'options' => $options,
        ]);

        if ($response->failed()) {
            Log::error('Ollama API Error', ['body' => $response->body()]);
            throw new \Exception('Failed to communicate with Ollama.');
        }

        return $response->json('response');
    }

    protected function runGemini(string $model, string $prompt, array $options)
    {
        $apiKey = config('services.gemini.api_key');
        
        if (empty($apiKey)) {
            throw new \Exception('Gemini API Key is missing. Please set GEMINI_API_KEY in .env');
        }

        $client = \Gemini\Gemini::client($apiKey);

        // If model is not specified or generic, default to gemini-pro
        if (empty($model) || $model === 'gemini') {
            $model = 'gemini-pro';
        }

        try {
            $result = $client->generativeModel(model: $model)->generateContent($prompt);
            return $result->text();
        } catch (\Exception $e) {
            Log::error('Gemini API Error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function runOpenAi(string $model, string $prompt, array $options)
    {
        // Placeholder for OpenAI implementation
        return "OpenAI response for: {$prompt}";
    }

    protected function runGrok(string $model, string $prompt, array $options)
    {
        // Placeholder for Grok implementation
        return "Grok response for: {$prompt}";
    }
}
