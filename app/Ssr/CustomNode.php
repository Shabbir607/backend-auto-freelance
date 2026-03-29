<?php

namespace App\Ssr;

use Spatie\Ssr\Engines\Node;

class CustomNode extends Node
{
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
