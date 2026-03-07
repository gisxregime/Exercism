<?php
// helpers/response.php

function setCorsHeaders(): void {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

function respond(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function respondSuccess(array $data, int $code = 200): void {
    respond($code, array_merge(['success' => true], $data));
}

function respondError(string $message, int $code = 400): void {
    respond($code, ['success' => false, 'message' => $message]);
}

function getRequestBody(): object {
    $raw = file_get_contents("php://input");
    return json_decode($raw) ?? new stdClass();
}

function getQueryParam(string $key, mixed $default = null): mixed {
    return isset($_GET[$key]) ? htmlspecialchars(trim($_GET[$key])) : $default;
}
