<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'google' => [
        // Service Account Strategy
        'application_credentials' => env('GOOGLE_APPLICATION_CREDENTIALS'),
        'calendar_id' => env('GOOGLE_CALENDAR_ID', 'primary'),
        
        // OAuth Strategy (User specific) - Socialite
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI', 'http://localhost:8000/api/auth/google/callback'),
    ],

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    
        /*
    |--------------------------------------------------------------------------
    | Custom SaaS Platform
    |--------------------------------------------------------------------------
    |
    | Store credentials for your freelancer/third-party platform integrations
    | here. Do not store them in the database. Pull from .env via this file.
    |
    */
    
    'freelancer' => [
    'client_id' => env('FREELANCER_CLIENT_ID'),
    'client_secret' => env('FREELANCER_CLIENT_SECRET'),
    'redirect_uri' => env('FREELANCER_REDIRECT_URI'),
    'token' => env('FREELANCER_PUBLIC_TOKEN'),
    'base_url' => env('FREELANCER_BASE_URL', 'https://www.freelancer-sandbox.com'),
],
    'openwebui' => [
    'url' => env('OPENWEBUI_URL'),
    'key' => env('OPENWEBUI_API_KEY'),
    'model' => env('OPENWEBUI_MODEL'),
],

    'gemini' => [
        'api_key' => env('GEMINI_API_KEY'),
    ],

    'n8n' => [
        'webhook_url' => env('N8N_WEBHOOK_URL'),
    ],

    'upwork' => [
        'client_id' => env('UPWORK_CLIENT_ID'),
        'client_secret' => env('UPWORK_CLIENT_SECRET'),
        'redirect_uri' => env('UPWORK_REDIRECT_URI'),
        'base_url' => env('UPWORK_BASE_URL', 'https://www.upwork.com/api'),
    ],

];
