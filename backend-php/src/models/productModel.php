<?php
require_once __DIR__ . '/../config/db.php';

class Product {
    private static $collection;

    public static function init() {
        $db = connectDB();
        self::$collection = $db->selectCollection('products');
    }

    // Create a new product
    public static function create($data) {
        self::init();
        $result = self::$collection->insertOne($data);
        if ($result->getInsertedId()) {
            return array_merge(["_id" => (string) $result->getInsertedId()], $data);
        }
        return null;
    }

    // Get product by ID
    public static function findById($id) {
        self::init();
        return self::$collection->findOne(["_id" => new MongoDB\BSON\ObjectId($id)]);
    }

    // Get all products
    public static function getAll() {
        self::init();
        return self::$collection->find()->toArray();
    }

    // Update product
    public static function update($id, $data) {
        self::init();
        $result = self::$collection->updateOne(
            ["_id" => new MongoDB\BSON\ObjectId($id)],
            ['$set' => $data]
        );
        return $result->getModifiedCount() > 0;
    }

    // Delete product
    public static function delete($id) {
        self::init();
        $result = self::$collection->deleteOne(["_id" => new MongoDB\BSON\ObjectId($id)]);
        return $result->getDeletedCount() > 0;
    }
}

// Initialize collection
Product::init();
