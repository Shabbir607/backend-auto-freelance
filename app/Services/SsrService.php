<?php

namespace App\Services;

use Spatie\Ssr\Renderer;
use App\Ssr\CustomNode as Node;

class SsrService
{
    public static function render(string $url, array $context = []): ?string
    {
        if (!config('ssr.enabled')) {
            return null;
        }

        try {
            $nodePath = config('ssr.node_path', 'node');
            $bundlePath = config('ssr.bundle_path');
            
            // Create a temporary relay script that imports and runs the SSR bundle
            $contextJson = json_encode($context);
            $relayScript = <<<JS
import render from 'file://{$bundlePath}';
const context = {$contextJson};
const url = '{$url}';
try {
    const response = render(url, context);
    process.stdout.write(typeof response === 'string' ? response : JSON.stringify(response));
} catch (e) {
    process.stderr.write(e.stack || e.message);
    process.exit(1);
}
JS;
            $tempRelay = storage_path('app/ssr/relay_' . md5($url . time()) . '.mjs');
            file_put_contents($tempRelay, $relayScript);

            $command = [$nodePath, '--max-old-space-size=2048', $tempRelay];
            
            $process = new \Symfony\Component\Process\Process($command);
            $process->run();
            
            // Cleanup
            if (file_exists($tempRelay)) @unlink($tempRelay);

            if (!$process->isSuccessful()) {
                throw new \Exception('Node SSR Failed: ' . $process->getErrorOutput());
            }

            $html = $process->getOutput();
            
            if (empty($html)) {
                \Log::warning('SSR returned empty HTML for URL: ' . $url);
            }

            return $html;
        } catch (\Exception $e) {
            $errorMsg = 'SSR Rendering Error: ' . $e->getMessage();
            
            // Check if there is specific engine error output
            if (isset($engine) && method_exists($engine, 'getErrors')) {
                $errorMsg .= ' | Engine Errors: ' . implode("\n", $engine->getErrors());
            }

            if ($e instanceof \Symfony\Component\Process\Exception\ProcessSignaledException) {
                $errorMsg .= ' | Output: ' . $e->getProcess()->getErrorOutput();
            } elseif ($e instanceof \Spatie\Ssr\Exceptions\EngineError) {
                // Spatie stores the original process exception if it failed
                $errorMsg .= ' | Full Trace: ' . $e->getTraceAsString();
            }
            \Log::error($errorMsg);
            return null;
        }
    }
}
