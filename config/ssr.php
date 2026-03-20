<?php

return [
    /*
     * Enable or disable server side rendering.
     */
    'enabled' => env('SSR_ENABLED', true),

    /*
     * The node command to be used for server side rendering.
     */
    'node_path' => env('SSR_NODE_PATH', 'node'),

    /*
     * The path to the server-side-rendering bundle.
     */
    'bundle_path' => base_path('bootstrap/ssr/ssr.cjs'),

    /*
     * The temporary path used for rendering.
     */
    'temp_path' => storage_path('app/ssr'),
];
