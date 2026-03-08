<?php
// middleware/auth.php

define('JWT_SECRET', 'your_secret_key_change_in_production');

function generateToken(int $userId): string {
    $header  = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode([
        'sub' => $userId,
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24 * 7) // 7 days
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$signature";
}

function verifyToken(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;

    [$header, $payload, $signature] = $parts;
    $expectedSig = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));

    if (!hash_equals($expectedSig, $signature)) return null;

    $data = json_decode(base64_decode($payload), true);
    if (!$data || $data['exp'] < time()) return null;

    return $data;
}

function requireAuth(): array {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!str_starts_with($authHeader, 'Bearer ')) {
        respondError('Unauthorized. Token missing.', 401);
    }

    $token = substr($authHeader, 7);
    $decoded = verifyToken($token);
    if (!$decoded) {
        respondError('Unauthorized. Invalid or expired token.', 401);
    }

    $db   = getDB();
    $stmt = $db->prepare("SELECT id, name, email, role FROM users WHERE id = ?");
    $stmt->bind_param("i", $decoded['sub']);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$user) {
        respondError('Unauthorized. User not found.', 401);
    }

    return $user;
}

function requireRole(array $user, string $role): void {
    if ($user['role'] !== $role) {
        respondError("Forbidden. Only $role accounts can perform this action.", 403);
    }
}
