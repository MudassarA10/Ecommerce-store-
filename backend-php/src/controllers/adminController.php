<?php
require_once __DIR__ . '/../models/Admin.php';
require_once __DIR__ . '/../utils/GenerateToken.php';

class AdminController {

    // Register a new admin
    public static function registerAdmin($request) {
        $name = $request['name'] ?? null;
        $email = $request['email'] ?? null;
        $password = $request['password'] ?? null;

        if (!$name || !$email || !$password) {
            http_response_code(400);
            echo json_encode(["message" => "All fields are required"]);
            exit;
        }

        $adminExists = Admin::findByEmail($email);
        if ($adminExists) {
            http_response_code(400);
            echo json_encode(["message" => "Admin already exists"]);
            exit;
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $admin = Admin::create([
            "name" => $name,
            "email" => $email,
            "password" => $hashedPassword
        ]);

        if ($admin) {
            echo json_encode([
                "_id" => $admin['_id'],
                "name" => $admin['name'],
                "email" => $admin['email'],
                "token" => GenerateToken::generate($admin['_id'])
            ]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid admin data"]);
        }
    }

    // Login admin & get token
    public static function loginAdmin($request) {
        $email = $request['email'] ?? null;
        $password = $request['password'] ?? null;

        $admin = Admin::findByEmail($email);
        if ($admin && password_verify($password, $admin['password'])) {
            echo json_encode([
                "_id" => $admin['_id'],
                "name" => $admin['name'],
                "email" => $admin['email'],
                "token" => GenerateToken::generate($admin['_id'])
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Invalid email or password"]);
        }
    }

    // Get admin profile
    public static function getAdminProfile($adminId) {
        $admin = Admin::findById($adminId);
        if ($admin) {
            echo json_encode([
                "_id" => $admin['_id'],
                "name" => $admin['name'],
                "email" => $admin['email']
            ]);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Admin not found"]);
        }
    }
}
