<?php
$filePath = '/opt/lampp/htdocs/backend-auto-freelance/storage/app/private/n8n_workflows_MASTER_PRODUCTION.csv';
$handle = fopen($filePath, 'r');
$header = fgetcsv($handle, 0, ',', '"');
echo "Header count: " . count($header) . "\n";
$firstRow = fgetcsv($handle, 0, ',', '"');
echo "First row count: " . count($firstRow) . "\n";
fclose($handle);
