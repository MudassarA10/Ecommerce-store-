<?php
require_once __DIR__ . '/../models/AdminModel.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    public static function protect($req, $res, $next) {
        $headers = getallheaders();
        $token = null;

        if (isset($headers['Authorization']) && preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            $token = $matches[1];
        }

        if (!$token) {
            http_response_code(401);
            echo json_encode(["error" => "Not authorized, no token"]);
            exit();
        }

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $adminModel = new AdminModel();
            $req->admin = $adminModel->findById($decoded->id, ['password']); // Exclude password
            if (!$req->admin) {
                throw new Exception('Admin not found');
            }
            $next();
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(["error" => "Not authorized, token failed", "details" => $e->getMessage()]);
            exit();
        }
    }
}
