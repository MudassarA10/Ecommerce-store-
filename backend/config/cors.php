<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Allow CORS for API routes
    'allowed_methods' => ['*'], // Allow all HTTP methods
    'allowed_origins' => ['*'], // Allow frontend origin
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Set to true if using authentication
];
