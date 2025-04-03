<?php
require_once __DIR__ . '/../middleware/AuthMiddleware.php';
require_once __DIR__ . '/../middleware/UploadMiddleware.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Api\Admin\AdminApi;

// Cloudinary configuration
Configuration::instance([
    'cloud' => [
        'cloud_name' => $_ENV['CLOUDINARY_CLOUD_NAME'],
        'api_key' => $_ENV['CLOUDINARY_API_KEY'],
        'api_secret' => $_ENV['CLOUDINARY_API_SECRET']
    ]
]);

$router->post('/api/upload', function ($req, $res) {
    AuthMiddleware::protect($req, $res, function () use ($req, $res) {
        try {
            if (!isset($_FILES['image'])) {
                http_response_code(400);
                echo json_encode(["error" => "No file uploaded"]);
                return;
            }

            $fileTmpPath = $_FILES['image']['tmp_name'];

            // Upload to Cloudinary
            $upload = (new UploadApi())->upload($fileTmpPath);

            $uploadedImage = [
                "url" => $upload['secure_url'], // Cloudinary Image URL
                "publicId" => $upload['public_id'] // Cloudinary Public ID
            ];

            echo json_encode($uploadedImage);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Image upload failed", "details" => $e->getMessage()]);
        }
    });
});

// Image deletion route (commented in JS)
$router->delete('/api/upload/{publicId}', function ($req, $res, $args) {
    AuthMiddleware::protect($req, $res, function () use ($req, $res, $args) {
        try {
            $publicId = $args['publicId'] ?? null;

            if (!$publicId) {
                http_response_code(400);
                echo json_encode(["error" => "Public ID is required"]);
                return;
            }

            // Delete image from Cloudinary
            (new AdminApi())->deleteAssets([$publicId]);

            echo json_encode(["message" => "Image deleted successfully"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to delete image", "details" => $e->getMessage()]);
        }
    });
});
