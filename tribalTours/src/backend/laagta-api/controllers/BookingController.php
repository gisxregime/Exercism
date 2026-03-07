<?php
// controllers/BookingController.php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../helpers/response.php';

class BookingController {

    public static function index(): void {
        $authUser = requireAuth();
        $db       = getDB();

        if ($authUser['role'] === 'Tawo') {
            $stmt = $db->prepare(
                "SELECT b.*, l.title AS listing_title, l.location AS listing_location,
                        l.price AS listing_price, l.category,
                        u.name AS guide_name, u.profile_photo AS guide_photo
                 FROM bookings b
                 JOIN listings l ON l.id = b.listing_id
                 JOIN users u ON u.id = b.guide_id
                 WHERE b.tawo_id = ?
                 ORDER BY b.created_at DESC"
            );
            $stmt->bind_param("i", $authUser['id']);
        } else {
            // Giya sees bookings made for their tours
            $stmt = $db->prepare(
                "SELECT b.*, l.title AS listing_title, l.location AS listing_location,
                        l.price AS listing_price, l.category,
                        u.name AS tawo_name, u.profile_photo AS tawo_photo
                 FROM bookings b
                 JOIN listings l ON l.id = b.listing_id
                 JOIN users u ON u.id = b.tawo_id
                 WHERE b.guide_id = ?
                 ORDER BY b.created_at DESC"
            );
            $stmt->bind_param("i", $authUser['id']);
        }

        $stmt->execute();
        $bookings = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        respondSuccess(['bookings' => $bookings]);
    }

    public static function store(): void {
        $authUser = requireAuth();
        requireRole($authUser, 'Tawo');

        $body = getRequestBody();

        $listingId     = intval($body->listingId      ?? 0);
        $guideId       = intval($body->guideId        ?? 0);
        $date          = trim($body->date             ?? '');
        $groupSize     = intval($body->groupSize       ?? 1);
        $paymentMethod = trim($body->paymentMethod    ?? '');

        if (!$listingId || !$guideId || !$date || !$paymentMethod) {
            respondError('Fields listingId, guideId, date, and paymentMethod are required.');
        }
        if (!strtotime($date) || strtotime($date) < strtotime('today')) {
            respondError('Date must be a valid future date.');
        }
        if ($groupSize < 1) {
            respondError('Group size must be at least 1.');
        }

        $db = getDB();

        // Validate listing and guide match
        $check = $db->prepare("SELECT id, guide_id, price, max_group_size FROM listings WHERE id = ?");
        $check->bind_param("i", $listingId);
        $check->execute();
        $listing = $check->get_result()->fetch_assoc();
        $check->close();

        if (!$listing) {
            respondError('Listing not found.', 404);
        }
        if ($listing['guide_id'] !== $guideId) {
            respondError('Guide does not match listing.', 400);
        }
        if ($listing['max_group_size'] > 0 && $groupSize > $listing['max_group_size']) {
            respondError("Group size exceeds maximum of {$listing['max_group_size']}.", 400);
        }

        $totalPrice = $listing['price'] * $groupSize;
        $status     = 'pending';

        $stmt = $db->prepare(
            "INSERT INTO bookings (tawo_id, guide_id, listing_id, date, group_size, payment_method, total_price, status, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        );
        $stmt->bind_param("iiisisds",
            $authUser['id'], $guideId, $listingId, $date,
            $groupSize, $paymentMethod, $totalPrice, $status
        );

        if (!$stmt->execute()) {
            respondError('Failed to create booking.', 500);
        }
        $newId = $stmt->insert_id;
        $stmt->close();

        $fetch = $db->prepare("SELECT * FROM bookings WHERE id = ?");
        $fetch->bind_param("i", $newId);
        $fetch->execute();
        $booking = $fetch->get_result()->fetch_assoc();
        $fetch->close();

        respondSuccess(['booking' => $booking], 201);
    }

    public static function updateStatus(int $id): void {
        $authUser = requireAuth();

        $body   = getRequestBody();
        $status = trim($body->status ?? '');

        $allowed = ['confirmed', 'completed', 'cancelled'];
        if (!in_array($status, $allowed)) {
            respondError("Status must be one of: " . implode(', ', $allowed) . ".");
        }

        $db    = getDB();
        $check = $db->prepare("SELECT tawo_id, guide_id, status FROM bookings WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        $booking = $check->get_result()->fetch_assoc();
        $check->close();

        if (!$booking) {
            respondError('Booking not found.', 404);
        }

        $isOwner = ($authUser['id'] === $booking['tawo_id'] || $authUser['id'] === $booking['guide_id']);
        if (!$isOwner) {
            respondError('Forbidden. You are not associated with this booking.', 403);
        }

        // Business rules
        if ($booking['status'] === 'completed') {
            respondError('Completed bookings cannot be changed.');
        }
        if ($booking['status'] === 'cancelled') {
            respondError('Cancelled bookings cannot be changed.');
        }

        $stmt = $db->prepare("UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        $stmt->close();

        $fetch = $db->prepare("SELECT * FROM bookings WHERE id = ?");
        $fetch->bind_param("i", $id);
        $fetch->execute();
        $updated = $fetch->get_result()->fetch_assoc();
        $fetch->close();

        respondSuccess(['booking' => $updated]);
    }
}
