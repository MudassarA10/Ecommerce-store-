<?php
require 'vendor/autoload.php';

use MongoDB\Client;
use Slim\Factory\AppFactory;
use Slim\Middleware\BodyParsingMiddleware;
use Slim\Middleware\ErrorMiddleware;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;  
use CorsSlim\CorsSlim;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Validate environment variables
if (!isset($_ENV['MONGO_URI']) || !isset($_ENV['MONGO_DB_NAME'])) {
    die('Error: Missing MongoDB configuration in .env file.');
}

// Initialize MongoDB connection
try {
    $client = new Client($_ENV['MONGO_URI']);
    $db = $client->selectDatabase($_ENV['MONGO_DB_NAME']);
} catch (Exception $e) {
    die('MongoDB Connection Error: ' . $e->getMessage());
}

// Create Slim app
$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);
$app->add(new CorsSlim());

// CORS Middleware
$app->options('/{routes:.*}', function (Request $request, Response $response) {
    return $response;
});

// Routes
require __DIR__ . '/src/routes/productRoutes.php';
require __DIR__ . '/src/routes/adminRoutes.php';
require __DIR__ . '/src/routes/uploadRoutes.php';

// Run App
$app->run();
