<?php
// controllers/GuideController.php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

class GuideController {

    public static function index(): void {
        $location  = getQueryParam('location');
        $specialty = getQueryParam('specialty');

        $db    = getDB();
        $where = ["u.role = 'Giya'"];
        $types = '';
        $binds = [];

        if ($location) {
            $where[] = "u.location LIKE ?";
            $types  .= 's';
            $binds[] = "%$location%";
        }
        if ($specialty) {
            $where[] = "u.specialty LIKE ?";
            $types  .= 's';
            $binds[] = "%$specialty%";
        }

        $whereClause = implode(' AND ', $where);
        $sql = "SELECT u.id, u.name, u.bio, u.location, u.specialty, u.profile_photo,
                       COALESCE(AVG(r.stars), 0) AS avg_rating,
                       COUNT(DISTINCT r.id) AS total_reviews
                FROM users u
                LEFT JOIN ratings r ON r.guide_id = u.id
                WHERE $whereClause
                GROUP BY u.id
                ORDER BY avg_rating DESC";

        $stmt = $db->prepare($sql);
        if ($types && $binds) {
            $stmt->bind_param($types, ...$binds);
        }
        $stmt->execute();
        $guides = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        foreach ($guides as &$guide) {
            $guide['avg_rating'] = round((float)$guide['avg_rating'], 1);
        }

        respondSuccess(['guides' => $guides, 'total' => count($guides)]);
    }

    public static function show(int $id): void {
        $db = getDB();

        // Guide profile
        $stmt = $db->prepare(
            "SELECT u.id, u.name, u.bio, u.location, u.specialty, u.profile_photo,
                    COALESCE(AVG(r.stars), 0) AS avg_rating,
                    COUNT(DISTINCT r.id) AS total_reviews
             FROM users u
             LEFT JOIN ratings r ON r.guide_id = u.id
             WHERE u.id = ? AND u.role = 'Giya'
             GROUP BY u.id"
        );
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $guide = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$guide) {
            respondError('Guide not found.', 404);
        }
        $guide['avg_rating'] = round((float)$guide['avg_rating'], 1);

        // Listings by this guide
        $stmt2 = $db->prepare(
            "SELECT id, title, description, location, price, duration, max_group_size, category, created_at
             FROM listings WHERE guide_id = ? ORDER BY created_at DESC"
        );
        $stmt2->bind_param("i", $id);
        $stmt2->execute();
        $listings = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt2->close();

        // Reviews for this guide
        $stmt3 = $db->prepare(
            "SELECT r.id, r.stars, r.comment, r.created_at,
                    u.name AS reviewer_name, u.profile_photo AS reviewer_photo
             FROM ratings r
             JOIN users u ON u.id = r.tawo_id
             WHERE r.guide_id = ?
             ORDER BY r.created_at DESC"
        );
        $stmt3->bind_param("i", $id);
        $stmt3->execute();
        $reviews = $stmt3->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt3->close();

        respondSuccess([
            'guide'    => $guide,
            'listings' => $listings,
            'reviews'  => $reviews,
        ]);
    }
}
