<?php
// controllers/RatingController.php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../helpers/response.php';

class RatingController {

    public static function store(): void {
        $authUser = requireAuth();
        requireRole($authUser, 'Tawo');

        $body = getRequestBody();

        $bookingId = intval($body->bookingId ?? 0);
        $guideId   = intval($body->guideId   ?? 0);
        $stars     = intval($body->stars      ?? 0);
        $comment   = trim($body->comment     ?? '');

        if (!$bookingId || !$guideId || !$stars) {
            respondError('Fields bookingId, guideId, and stars are required.');
        }
        if ($stars < 1 || $stars > 5) {
            respondError('Stars must be between 1 and 5.');
        }

        $db = getDB();

        // Verify booking belongs to this user and is completed
        $check = $db->prepare(
            "SELECT id, status, guide_id FROM bookings WHERE id = ? AND tawo_id = ?"
        );
        $check->bind_param("ii", $bookingId, $authUser['id']);
        $check->execute();
        $booking = $check->get_result()->fetch_assoc();
        $check->close();

        if (!$booking) {
            respondError('Booking not found or does not belong to you.', 404);
        }
        if ($booking['status'] !== 'completed') {
            respondError('You can only rate completed bookings.');
        }
        if ($booking['guide_id'] !== $guideId) {
            respondError('Guide does not match booking.', 400);
        }

        // Prevent duplicate ratings
        $dup = $db->prepare("SELECT id FROM ratings WHERE booking_id = ? AND tawo_id = ?");
        $dup->bind_param("ii", $bookingId, $authUser['id']);
        $dup->execute();
        $dup->store_result();
        if ($dup->num_rows > 0) {
            respondError('You have already rated this booking.', 409);
        }
        $dup->close();

        $stmt = $db->prepare(
            "INSERT INTO ratings (booking_id, tawo_id, guide_id, stars, comment, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())"
        );
        $stmt->bind_param("iiiis", $bookingId, $authUser['id'], $guideId, $stars, $comment);

        if (!$stmt->execute()) {
            respondError('Failed to submit rating.', 500);
        }
        $newId = $stmt->insert_id;
        $stmt->close();

        $fetch = $db->prepare("SELECT * FROM ratings WHERE id = ?");
        $fetch->bind_param("i", $newId);
        $fetch->execute();
        $rating = $fetch->get_result()->fetch_assoc();
        $fetch->close();

        respondSuccess(['rating' => $rating], 201);
    }
}
