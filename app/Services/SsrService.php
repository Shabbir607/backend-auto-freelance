<?php

namespace App\Services;

use Spatie\Ssr\Renderer;
use Spatie\Ssr\Engines\Node;

class SsrService
{
    public static function render(string $url, array $context = []): ?string
    {
        if (!config('ssr.enabled')) {
            return null;
        }

        try {
            $nodePath = config('ssr.node_path', 'node');
            $tempPath = config('ssr.temp_path', storage_path('app/ssr'));
            $bundlePath = config('ssr.bundle_path');

            if (!file_exists($tempPath)) {
                mkdir($tempPath, 0755, true);
            }

            $engine = new Node($nodePath, $tempPath);
            $renderer = new Renderer($engine);
            $renderer->fallback(false);

            // Add URL to context if not present
            $context['url'] = $url;
            \Log::info("Attempting SSR for URL: $url");

            $html = $renderer
                ->entry($bundlePath)
                ->context($context)
                ->render();
            
            \Log::info("SSR Successful for URL: $url");

            return $html;
        } catch (\Exception $e) {
            \Log::error('SSR Rendering Error: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            throw $e;
            return null;
        }
    }
}
