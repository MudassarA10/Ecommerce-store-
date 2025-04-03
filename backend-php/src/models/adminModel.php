<?php
require_once __DIR__ . '/../config/db.php';

class Admin {
    private static $collection;

    public static function init() {
        $db = connectDB();
        self::$collection = $db->selectCollection('admins');
    }

    // Create a new admin
    public static function create($data) {
        self::init();
        $result = self::$collection->insertOne($data);
        if ($result->getInsertedId()) {
            return array_merge(["_id" => (string) $result->getInsertedId()], $data);
        }
        return null;
    }

    // Find admin by email
    public static function findByEmail($email) {
        self::init();
        return self::$collection->findOne(["email" => $email]);
    }

    // Find admin by ID
    public static function findById($id) {
        self::init();
        return self::$collection->findOne(["_id" => new MongoDB\BSON\ObjectId($id)]);
    }
}

// Initialize the collection
Admin::init();
