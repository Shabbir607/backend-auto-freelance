<?php
$response = curl_init('http://127.0.0.1:8000/api/admin/login');
$payload = json_encode([
    'email' => 'admin@shabbir.com',
    'password' => 'Shabbir$07890'
]);
curl_setopt($response, CURLOPT_RETURNTRANSFER, true);
curl_setopt($response, CURLOPT_POST, true);
curl_setopt($response, CURLOPT_POSTFIELDS, $payload);
curl_setopt($response, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
$result = curl_exec($response);
curl_close($response);
echo $result;
