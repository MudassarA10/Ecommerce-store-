<?php
require_once __DIR__ . '/../controllers/AdminController.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

$router->post('/api/admin/register', 'AdminController@registerAdmin');
$router->post('/api/admin/login', 'AdminController@loginAdmin');
$router->get('/api/admin/profile', function ($req, $res) {
    AuthMiddleware::protect($req, $res, function () use ($req, $res) {
        AdminController::getAdminProfile($req, $res);
    });
});
