<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'oauth/*', 'login', 'logout'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [

        env('FRONTEND_URL', 'http://localhost:3000'),
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:45678',
        env('APP_URL', 'http://localhost:8000'),
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'https://edgelancer.com',
        'http://edgelancer.com',
        'https://edge.srv1381478.hstgr.cloud',
        'https://www.edgelancer.com',
        'http://www.edgelancer.com',

    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [
        'Cache-Control',
        'Content-Language',
        'Content-Type',
        'Expires',
        'Last-Modified',
        'Pragma',
    ],

    'max_age' => 0,

    // VERY IMPORTANT for Passport + cookies/auth
    'supports_credentials' => true,

];
