<?php
require 'vendor/autoload.php';

use Cloudinary\Cloudinary;
use Cloudinary\Api\Upload\UploadApi;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Cloudinary Config
$cloudinary = new Cloudinary([
    'cloud_name' => $_ENV['CLOUDINARY_CLOUD_NAME'],
    'api_key' => $_ENV['CLOUDINARY_API_KEY'],
    'api_secret' => $_ENV['CLOUDINARY_API_SECRET']
]);

function uploadImage($file) {
    global $cloudinary;

    if (!isset($file) || $file['error'] != UPLOAD_ERR_OK) {
        return ["error" => "No valid file uploaded"];
    }

    $allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($file['type'], $allowedFormats)) {
        return ["error" => "Invalid file format. Only JPG, PNG, and WEBP allowed."];
    }

    try {
        $upload = (new UploadApi())->upload($file['tmp_name'], [
            "folder" => "ecommerce-images",
            "transformation" => [
                "width" => 500,
                "height" => 500,
                "crop" => "limit"
            ]
        ]);

        return [
            "url" => $upload['secure_url'],
            "public_id" => $upload['public_id']
        ];
    } catch (Exception $e) {
        return ["error" => "Upload failed: " . $e->getMessage()];
    }
}
?>
