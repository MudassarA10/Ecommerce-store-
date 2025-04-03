<?php

class ErrorMiddleware {
    public static function notFound($req, $res) {
        http_response_code(404);
        echo json_encode(["error" => "Not Found - " . $_SERVER['REQUEST_URI']]);
        exit();
    }

    public static function errorHandler($exception) {
        $statusCode = http_response_code() === 200 ? 500 : http_response_code();
        http_response_code($statusCode);

        $response = [
            "message" => $exception->getMessage(),
        ];

        if ($_ENV['NODE_ENV'] !== 'production') {
            $response["stack"] = $exception->getTraceAsString();
        }

        echo json_encode($response);
        exit();
    }
}
