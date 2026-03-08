<?php
// controllers/ListingController.php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../helpers/response.php';

class ListingController {

    public static function index(): void {
        $location = getQueryParam('location');
        $category = getQueryParam('category');

        $db    = getDB();
        $where = ['1=1'];
        $types = '';
        $binds = [];

        if ($location) {
            $where[] = "l.location LIKE ?";
            $types  .= 's';
            $binds[] = "%$location%";
        }
        if ($category) {
            $where[] = "l.category LIKE ?";
            $types  .= 's';
            $binds[] = "%$category%";
        }

        $whereClause = implode(' AND ', $where);
        $sql = "SELECT l.*, u.name AS guide_name, u.profile_photo AS guide_photo,
                       COALESCE(AVG(r.stars), 0) AS avg_rating
                FROM listings l
                JOIN users u ON u.id = l.guide_id
                LEFT JOIN ratings r ON r.guide_id = l.guide_id
                WHERE $whereClause
                GROUP BY l.id
                ORDER BY l.created_at DESC";

        $stmt = $db->prepare($sql);
        if ($types && $binds) {
            $stmt->bind_param($types, ...$binds);
        }
        $stmt->execute();
        $listings = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        foreach ($listings as &$l) {
            $l['avg_rating'] = round((float)$l['avg_rating'], 1);
        }

        respondSuccess(['listings' => $listings]);
    }

    public static function show(int $id): void {
        $db   = getDB();
        $stmt = $db->prepare(
            "SELECT l.*, u.name AS guide_name, u.bio AS guide_bio,
                    u.profile_photo AS guide_photo, u.location AS guide_location
             FROM listings l
             JOIN users u ON u.id = l.guide_id
             WHERE l.id = ?"
        );
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $listing = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$listing) {
            respondError('Listing not found.', 404);
        }

        $gStmt = $db->prepare("SELECT id, name, bio, location, profile_photo FROM users WHERE id = ?");
        $gStmt->bind_param("i", $listing['guide_id']);
        $gStmt->execute();
        $guide = $gStmt->get_result()->fetch_assoc();
        $gStmt->close();

        respondSuccess(['listing' => $listing, 'guide' => $guide]);
    }

    public static function store(): void {
        $authUser = requireAuth();
        requireRole($authUser, 'Giya');

        $body = getRequestBody();

        $title        = trim($body->title        ?? '');
        $description  = trim($body->description  ?? '');
        $location     = trim($body->location     ?? '');
        $price        = floatval($body->price      ?? 0);
        $duration     = trim($body->duration     ?? '');
        $maxGroupSize = intval($body->maxGroupSize ?? 0);
        $category     = trim($body->category     ?? '');

        if (!$title || !$description || !$location || !$price || !$duration || !$category) {
            respondError('All fields are required: title, description, location, price, duration, category.');
        }
        if ($price <= 0) {
            respondError('Price must be greater than zero.');
        }

        $db   = getDB();
        $stmt = $db->prepare(
            "INSERT INTO listings (guide_id, title, description, location, price, duration, max_group_size, category, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        );
        $stmt->bind_param("isssdssi",
            $authUser['id'], $title, $description, $location,
            $price, $duration, $maxGroupSize, $category
        );

        if (!$stmt->execute()) {
            respondError('Failed to create listing.', 500);
        }
        $newId = $stmt->insert_id;
        $stmt->close();

        $fetch = $db->prepare("SELECT * FROM listings WHERE id = ?");
        $fetch->bind_param("i", $newId);
        $fetch->execute();
        $listing = $fetch->get_result()->fetch_assoc();
        $fetch->close();

        respondSuccess(['listing' => $listing], 201);
    }

    public static function update(int $id): void {
        $authUser = requireAuth();
        requireRole($authUser, 'Giya');

        $db    = getDB();
        $check = $db->prepare("SELECT guide_id FROM listings WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        $listing = $check->get_result()->fetch_assoc();
        $check->close();

        if (!$listing) {
            respondError('Listing not found.', 404);
        }
        if ($listing['guide_id'] !== $authUser['id']) {
            respondError('Forbidden. You do not own this listing.', 403);
        }

        $body = getRequestBody();

        $title        = trim($body->title        ?? '');
        $description  = trim($body->description  ?? '');
        $location     = trim($body->location     ?? '');
        $price        = floatval($body->price      ?? 0);
        $duration     = trim($body->duration     ?? '');
        $maxGroupSize = intval($body->maxGroupSize ?? 0);
        $category     = trim($body->category     ?? '');

        if (!$title || !$description || !$location || !$price || !$duration || !$category) {
            respondError('All fields are required.');
        }

        $stmt = $db->prepare(
            "UPDATE listings SET title=?, description=?, location=?, price=?, duration=?, max_group_size=?, category=?, updated_at=NOW()
             WHERE id = ?"
        );
        $stmt->bind_param("sssdsssi",
            $title, $description, $location, $price, $duration, $maxGroupSize, $category, $id
        );

        if (!$stmt->execute()) {
            respondError('Failed to update listing.', 500);
        }
        $stmt->close();

        $fetch = $db->prepare("SELECT * FROM listings WHERE id = ?");
        $fetch->bind_param("i", $id);
        $fetch->execute();
        $updated = $fetch->get_result()->fetch_assoc();
        $fetch->close();

        respondSuccess(['listing' => $updated]);
    }

    public static function destroy(int $id): void {
        $authUser = requireAuth();
        requireRole($authUser, 'Giya');

        $db    = getDB();
        $check = $db->prepare("SELECT guide_id FROM listings WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        $listing = $check->get_result()->fetch_assoc();
        $check->close();

        if (!$listing) {
            respondError('Listing not found.', 404);
        }
        if ($listing['guide_id'] !== $authUser['id']) {
            respondError('Forbidden. You do not own this listing.', 403);
        }

        $stmt = $db->prepare("DELETE FROM listings WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();

        respondSuccess(['message' => 'Listing deleted successfully.']);
    }
}
