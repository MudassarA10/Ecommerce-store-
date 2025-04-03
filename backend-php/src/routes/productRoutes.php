<?php
require_once __DIR__ . '/../controllers/ProductController.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

$router->get('/api/products/categories', 'ProductController@getCategories');

$router->get('/api/products', 'ProductController@getProducts');
$router->post('/api/products', function ($req, $res) {
    AuthMiddleware::protect($req, $res, function () use ($req, $res) {
        ProductController::createProduct($req, $res);
    });
});

$router->get('/api/products/{id}', 'ProductController@getProductById');
$router->put('/api/products/{id}', function ($req, $res) {
    AuthMiddleware::protect($req, $res, function () use ($req, $res) {
        ProductController::updateProduct($req, $res);
    });
});
$router->delete('/api/products/{id}', function ($req, $res) {
    AuthMiddleware::protect($req, $res, function () use ($req, $res) {
        ProductController::deleteProduct($req, $res);
    });
});
