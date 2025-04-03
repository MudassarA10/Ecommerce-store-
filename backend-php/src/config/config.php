<?php
require_once __DIR__ . '/../../vendor/autoload.php'; // Load Composer dependencies
use MongoDB\Client;
use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

function connectDB() {
    try {
        $client = new Client($_ENV['MONGO_URI']);
        $database = $client->selectDatabase('E-Commerce-Data'); // Replace with your actual DB name
        echo "MongoDB Connected: " . $_ENV['MONGO_URI'];
        return $database;
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
}

// Uncomment below to test connection
connectDB();