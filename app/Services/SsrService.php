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
            // Proper file URI for Node.js import on Windows
            $bundleUrl = 'file:///' . str_replace(['\\', ' '], ['/', '%20'], $bundlePath);
            
            $ssrDir = storage_path('app/ssr');
            if (!is_dir($ssrDir)) {
                @mkdir($ssrDir, 0755, true);
            }

            $requestId = md5($url . time() . uniqid());
            $tempRelay = $ssrDir . '/relay_' . $requestId . '.mjs';
            $tempContext = $ssrDir . '/context_' . $requestId . '.json';
            
            // Write context to a file instead of embedding it directly in the script,
            // to prevent V8 parsing memory limits (AST Out Of Memory) on very large objects.
            $encodedContext = json_encode($context, JSON_INVALID_UTF8_SUBSTITUTE);
            if ($encodedContext === false) {
                throw new \Exception('JSON encoding of context failed: ' . json_last_error_msg());
            }
            file_put_contents($tempContext, $encodedContext);

            $escapedContextPath = str_replace('\\', '\\\\', $tempContext);
            $relayScript = <<<JS
import render from '{$bundleUrl}';
import fs from 'node:fs';

const context = JSON.parse(fs.readFileSync('{$escapedContextPath}', 'utf-8'));
const url = '{$url}';
try {
    const response = render(url, context);
    process.stdout.write(typeof response === 'string' ? response : JSON.stringify(response));
} catch (e) {
    process.stderr.write(e.stack || e.message);
    process.exit(1);
}
JS;
            file_put_contents($tempRelay, $relayScript);

            $command = [$nodePath, '--max-old-space-size=2048', $tempRelay];
            
            $process = new \Symfony\Component\Process\Process($command);
            $process->run();
            
            // Cleanup
            if (file_exists($tempRelay)) @unlink($tempRelay);
            if (file_exists($tempContext)) @unlink($tempContext);

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
