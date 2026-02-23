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
<<<<<<< HEAD
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'https://edgelancer.com',
        'http://edgelancer.com',
        'https://www.edgelancer.com',
        'http://www.edgelancer.com',
=======
        'http://localhost:3000',     // Vite dev server
        'http://127.0.0.1:3000',     // sometimes needed
        'http://localhost:5173',     // if you use port 5173
        'http://localhost:5174',     // Alternative Vite port
        'https://edgelancer.com', // TODO: Replace with your actual frontend domain
>>>>>>> 92afae8 (push live)
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