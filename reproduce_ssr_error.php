<?php
$nodePath = 'node';
$tempRelay = 'test_repro.mjs';
file_put_contents($tempRelay, "console.log('Success');");
$command = [$nodePath, $tempRelay];
$process = new \Symfony\Component\Process\Process($command);
$process->run();
echo "Output: " . $process->getOutput() . "\n";
echo "Error: " . $process->getErrorOutput() . "\n";
@unlink($tempRelay);
