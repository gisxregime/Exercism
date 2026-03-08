<?php
// controllers/MessageController.php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../helpers/response.php';

class MessageController {

    public static function conversations(): void {
        $authUser = requireAuth();
        $db       = getDB();

        // Get all unique conversation partners with latest message
        $stmt = $db->prepare(
            "SELECT
                other.id         AS user_id,
                other.name       AS user_name,
                other.profile_photo AS user_photo,
                other.role       AS user_role,
                last_msg.content AS last_message,
                last_msg.created_at AS last_message_at,
                last_msg.sender_id,
                SUM(CASE WHEN m.is_read = 0 AND m.receiver_id = ? THEN 1 ELSE 0 END) AS unread_count
             FROM messages m
             JOIN users other ON other.id = CASE
                WHEN m.sender_id = ? THEN m.receiver_id
                ELSE m.sender_id
             END
             JOIN messages last_msg ON last_msg.id = (
                SELECT id FROM messages
                WHERE (sender_id = ? AND receiver_id = other.id)
                   OR (sender_id = other.id AND receiver_id = ?)
                ORDER BY created_at DESC LIMIT 1
             )
             WHERE m.sender_id = ? OR m.receiver_id = ?
             GROUP BY other.id
             ORDER BY last_msg.created_at DESC"
        );

        $uid = $authUser['id'];
        $stmt->bind_param("iiiiii", $uid, $uid, $uid, $uid, $uid, $uid);
        $stmt->execute();
        $conversations = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        respondSuccess(['conversations' => $conversations]);
    }

    public static function thread(int $userId): void {
        $authUser = requireAuth();
        $db       = getDB();

        // Mark messages as read
        $markRead = $db->prepare(
            "UPDATE messages SET is_read = 1 WHERE sender_id = ? AND receiver_id = ? AND is_read = 0"
        );
        $markRead->bind_param("ii", $userId, $authUser['id']);
        $markRead->execute();
        $markRead->close();

        $stmt = $db->prepare(
            "SELECT m.*, u.name AS sender_name, u.profile_photo AS sender_photo
             FROM messages m
             JOIN users u ON u.id = m.sender_id
             WHERE (m.sender_id = ? AND m.receiver_id = ?)
                OR (m.sender_id = ? AND m.receiver_id = ?)
             ORDER BY m.created_at ASC"
        );
        $stmt->bind_param("iiii", $authUser['id'], $userId, $userId, $authUser['id']);
        $stmt->execute();
        $messages = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        respondSuccess(['messages' => $messages]);
    }

    public static function send(): void {
        $authUser = requireAuth();

        $body       = getRequestBody();
        $receiverId = intval($body->receiverId ?? 0);
        $content    = trim($body->content     ?? '');

        if (!$receiverId || !$content) {
            respondError('receiverId and content are required.');
        }
        if ($receiverId === $authUser['id']) {
            respondError('You cannot message yourself.');
        }
        if (strlen($content) > 2000) {
            respondError('Message content must be under 2000 characters.');
        }

        $db = getDB();

        // Verify receiver exists
        $check = $db->prepare("SELECT id FROM users WHERE id = ?");
        $check->bind_param("i", $receiverId);
        $check->execute();
        $check->store_result();
        if ($check->num_rows === 0) {
            respondError('Receiver not found.', 404);
        }
        $check->close();

        $stmt = $db->prepare(
            "INSERT INTO messages (sender_id, receiver_id, content, is_read, created_at)
             VALUES (?, ?, ?, 0, NOW())"
        );
        $stmt->bind_param("iis", $authUser['id'], $receiverId, $content);

        if (!$stmt->execute()) {
            respondError('Failed to send message.', 500);
        }
        $newId = $stmt->insert_id;
        $stmt->close();

        $fetch = $db->prepare(
            "SELECT m.*, u.name AS sender_name, u.profile_photo AS sender_photo
             FROM messages m JOIN users u ON u.id = m.sender_id
             WHERE m.id = ?"
        );
        $fetch->bind_param("i", $newId);
        $fetch->execute();
        $message = $fetch->get_result()->fetch_assoc();
        $fetch->close();

        respondSuccess(['message' => $message], 201);
    }
}
