<?php
// index.php — LaagTa API Router
// Base URL: /api/v1

require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/middleware/auth.php';

require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/UserController.php';
require_once __DIR__ . '/controllers/GuideController.php';
require_once __DIR__ . '/controllers/ListingController.php';
require_once __DIR__ . '/controllers/BookingController.php';
require_once __DIR__ . '/controllers/RatingController.php';
require_once __DIR__ . '/controllers/MessageController.php';

setCorsHeaders();

// Parse request
$method = $_SERVER['REQUEST_METHOD'];
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Strip base prefix (adjust if API lives at a sub-path)
$uri = preg_replace('#^/api/v1#', '', $uri);
$uri = rtrim($uri, '/') ?: '/';

// ─── AUTH ────────────────────────────────────────────────────
if ($uri === '/auth/register' && $method === 'POST') {
    AuthController::register();
}
if ($uri === '/auth/login' && $method === 'POST') {
    AuthController::login();
}
if ($uri === '/auth/logout' && $method === 'POST') {
    AuthController::logout();
}

// ─── USERS ───────────────────────────────────────────────────
if ($uri === '/users/me' && $method === 'GET') {
    UserController::getMe();
}
if ($uri === '/users/me' && $method === 'PUT') {
    UserController::updateMe();
}

// ─── GUIDES ──────────────────────────────────────────────────
if ($uri === '/guides' && $method === 'GET') {
    GuideController::index();
}
if (preg_match('#^/guides/(\d+)$#', $uri, $m) && $method === 'GET') {
    GuideController::show((int)$m[1]);
}

// ─── LISTINGS ────────────────────────────────────────────────
if ($uri === '/listings' && $method === 'GET') {
    ListingController::index();
}
if ($uri === '/listings' && $method === 'POST') {
    ListingController::store();
}
if (preg_match('#^/listings/(\d+)$#', $uri, $m) && $method === 'GET') {
    ListingController::show((int)$m[1]);
}
if (preg_match('#^/listings/(\d+)$#', $uri, $m) && $method === 'PUT') {
    ListingController::update((int)$m[1]);
}
if (preg_match('#^/listings/(\d+)$#', $uri, $m) && $method === 'DELETE') {
    ListingController::destroy((int)$m[1]);
}

// ─── BOOKINGS ────────────────────────────────────────────────
if ($uri === '/bookings' && $method === 'GET') {
    BookingController::index();
}
if ($uri === '/bookings' && $method === 'POST') {
    BookingController::store();
}
if (preg_match('#^/bookings/(\d+)/status$#', $uri, $m) && $method === 'PUT') {
    BookingController::updateStatus((int)$m[1]);
}

// ─── RATINGS ─────────────────────────────────────────────────
if ($uri === '/ratings' && $method === 'POST') {
    RatingController::store();
}

// ─── MESSAGES ────────────────────────────────────────────────
if ($uri === '/messages/conversations' && $method === 'GET') {
    MessageController::conversations();
}
if (preg_match('#^/messages/(\d+)$#', $uri, $m) && $method === 'GET') {
    MessageController::thread((int)$m[1]);
}
if ($uri === '/messages' && $method === 'POST') {
    MessageController::send();
}

// ─── 404 FALLBACK ─────────────────────────────────────────────
respondError("Route not found: $method $uri", 404);
