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
            // Adding extra memory limits to prevent Node aborting (Signal 6 / SIGABRT) during memory intensive SSR renders
            $nodePath .= ' --max-old-space-size=2048';
            
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
 
            $html = $renderer
                ->entry($bundlePath)
                ->context($context)
                ->render();
 
            return $html;
        } catch (\Exception $e) {
            $errorMsg = 'SSR Rendering Error: ' . $e->getMessage();
            if ($e instanceof \Symfony\Component\Process\Exception\ProcessSignaledException) {
                $errorMsg .= ' | Output: ' . $e->getProcess()->getErrorOutput();
            } elseif ($e instanceof \Spatie\Ssr\Exceptions\EngineError && $e->getException() instanceof \Symfony\Component\Process\Exception\ProcessFailedException) {
                $errorMsg .= ' | Output: ' . $e->getException()->getProcess()->getErrorOutput();
            }
            \Log::error($errorMsg);
            return null;
        }
    }
}
