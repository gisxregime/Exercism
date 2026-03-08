<?php
// controllers/UserController.php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../helpers/response.php';

class UserController {

    public static function getMe(): void {
        $user = requireAuth();
        respondSuccess(['user' => $user]);
    }

    public static function updateMe(): void {
        $authUser = requireAuth();
        $body     = getRequestBody();

        $name     = trim($body->name     ?? '');
        $bio      = trim($body->bio      ?? '');
        $location = trim($body->location ?? '');
        $phone    = trim($body->phone    ?? '');

        if (!$name) {
            respondError('Name is required.');
        }

        $db   = getDB();
        $stmt = $db->prepare(
            "UPDATE users SET name = ?, bio = ?, location = ?, phone = ?, updated_at = NOW() WHERE id = ?"
        );
        $stmt->bind_param("ssssi", $name, $bio, $location, $phone, $authUser['id']);

        if (!$stmt->execute()) {
            respondError('Failed to update profile.', 500);
        }
        $stmt->close();

        $fetch = $db->prepare("SELECT id, name, email, role, bio, location, phone FROM users WHERE id = ?");
        $fetch->bind_param("i", $authUser['id']);
        $fetch->execute();
        $updated = $fetch->get_result()->fetch_assoc();
        $fetch->close();

        respondSuccess(['user' => $updated]);
    }
}
