<?php
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

function generateToken($id) {
    $secretKey = $_ENV['JWT_SECRET'];
    $payload = [
        "id" => $id,
        "exp" => time() + (30 * 24 * 60 * 60) // 30 days expiration
    ];

    return JWT::encode($payload, $secretKey, 'HS256');
}
?>
