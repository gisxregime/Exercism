<?php
// controllers/AuthController.php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../helpers/response.php';

class AuthController {

    public static function register(): void {
        $body = getRequestBody();

        $name     = trim($body->name     ?? '');
        $email    = trim($body->email    ?? '');
        $password = trim($body->password ?? '');
        $role     = trim($body->role     ?? '');

        if (!$name || !$email || !$password || !$role) {
            respondError('All fields (name, email, password, role) are required.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respondError('Invalid email address.');
        }
        if (!in_array($role, ['Tawo', 'Giya'])) {
            respondError('Role must be either Tawo or Giya.');
        }
        if (strlen($password) < 8) {
            respondError('Password must be at least 8 characters.');
        }

        $db = getDB();

        $check = $db->prepare("SELECT id FROM users WHERE email = ?");
        $check->bind_param("s", $email);
        $check->execute();
        $check->store_result();
        if ($check->num_rows > 0) {
            respondError('Email is already registered.', 409);
        }
        $check->close();

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $db->prepare("INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())");
        $stmt->bind_param("ssss", $name, $email, $hash, $role);

        if (!$stmt->execute()) {
            respondError('Registration failed. Please try again.', 500);
        }

        $userId = $stmt->insert_id;
        $stmt->close();

        $token = generateToken($userId);

        respondSuccess([
            'token' => $token,
            'user'  => [
                'id'    => $userId,
                'name'  => $name,
                'email' => $email,
                'role'  => $role,
            ]
        ], 201);
    }

    public static function login(): void {
        $body = getRequestBody();

        $email    = trim($body->email    ?? '');
        $password = trim($body->password ?? '');

        if (!$email || !$password) {
            respondError('Email and password are required.');
        }

        $db   = getDB();
        $stmt = $db->prepare("SELECT id, name, email, password_hash, role FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            respondError('Invalid email or password.', 401);
        }

        $token = generateToken($user['id']);
        unset($user['password_hash']);

        respondSuccess(['token' => $token, 'user' => $user]);
    }

    public static function logout(): void {
        // Stateless JWT — client discards token.
        // For server-side invalidation, store token in a blocklist table.
        respondSuccess(['message' => 'Logged out successfully.']);
    }
}
