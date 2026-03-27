<?php

namespace App\Ssr;

use Spatie\Ssr\Engines\Node;

class CustomNode extends Node
{
    public function run(string $script): string
    {
        $tempFilePath = $this->createTempFilePath();

        file_put_contents($tempFilePath, $script);

        // Use array-based Process constructor to handle spaces in paths automatically
        $process = new \Symfony\Component\Process\Process([$this->nodePath, $tempFilePath]);

        try {
            return substr($process->mustRun()->getOutput(), 0, -1);
        } catch (\Symfony\Component\Process\Exception\ProcessFailedException $exception) {
            throw \Spatie\Ssr\Exceptions\EngineError::withException($exception);
        } finally {
            if (file_exists($tempFilePath)) {
                unlink($tempFilePath);
            }
        }
    }

    protected function createTempFilePath(): string
    {
        // Use .cjs extension to ensure Node.js treats the script as CommonJS
        // even when "type": "module" is set in package.json
        return implode(DIRECTORY_SEPARATOR, [
            $this->tempPath, 
            md5(intval(microtime(true) * 1000) . random_bytes(5)) . '.cjs'
        ]);
    }
}
