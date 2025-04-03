<?php
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Api\Admin\AdminApi;

class ProductController
{

    // Get distinct categories
    public static function getCategories()
    {
        try {
            $categories = Product::getDistinctCategories();
            echo json_encode($categories);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error fetching categories"]);
        }
    }

    // Get products with pagination and search
    public static function getProducts($query)
    {
        $pageSize = 10;
        $page = isset($query['page']) ? (int) $query['page'] : 1;
        $keyword = isset($query['keyword']) ? $query['keyword'] : "";

        try {
            $result = Product::getAll($page, $pageSize, $keyword);
            echo json_encode($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error fetching products"]);
        }
    }

    // Get product by ID
    public static function getProductById($id)
    {
        $product = Product::findById($id);
        if ($product) {
            echo json_encode($product);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Product not found"]);
        }
    }

    // Create a new product
    public static function createProduct($request)
    {
        $name = $request['name'] ?? null;
        $description = $request['description'] ?? null;
        $price = $request['price'] ?? null;
        $category = $request['category'] ?? null;
        $imageUrl = $request['imageUrl'] ?? null;
        $imagePublicId = $request['imagePublicId'] ?? null;
        $stock = $request['stock'] ?? null;

        if (!$name || !$price || !$category) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required fields"]);
            exit;
        }

        $product = Product::create([
            "name" => $name,
            "description" => $description,
            "price" => $price,
            "category" => $category,
            "image" => [
                "url" => $imageUrl,
                "publicId" => $imagePublicId
            ],
            "stock" => $stock
        ]);

        if ($product) {
            http_response_code(201);
            echo json_encode($product);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid product data"]);
        }
    }

    // Update product details
    public static function updateProduct($id, $request)
    {
        $product = Product::findById($id);
        if (!$product) {
            http_response_code(404);
            echo json_encode(["message" => "Product not found"]);
            return;
        }

        $updatedData = [
            "name" => $request['name'] ?? $product['name'],
            "description" => $request['description'] ?? $product['description'],
            "price" => $request['price'] ?? $product['price'],
            "category" => $request['category'] ?? $product['category'],
            "image" => $request['image'] ?? $product['image'],
            "stock" => $request['stock'] ?? $product['stock']
        ];

        $updatedProduct = Product::update($id, $updatedData);

        if ($updatedProduct) {
            echo json_encode($updatedProduct);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Failed to update product"]);
        }
    }

    // Delete product and Cloudinary image
    public static function deleteProduct($id)
    {
        $product = Product::findById($id);
        if (!$product) {
            http_response_code(404);
            echo json_encode(["message" => "Product not found"]);
            return;
        }

        try {
            // Delete from Cloudinary if image exists
            if (isset($product['image']['publicId'])) {
                Configuration::instance([
                    'cloud' => [
                        'cloud_name' => $_ENV['CLOUDINARY_CLOUD_NAME'],
                        'api_key' => $_ENV['CLOUDINARY_API_KEY'],
                        'api_secret' => $_ENV['CLOUDINARY_API_SECRET']
                    ]
                ]);

                $cloudinary = new UploadApi();
                $cloudinary->destroy($product['image']['publicId']);
            }

            // Delete from database
            $deleted = Product::delete($id);
            if ($deleted) {
                echo json_encode(["message" => "Product and image deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete product"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error deleting product"]);
        }
    }
}
