<?php
// ─────────────────────────────────────────────
// auth.php — handles Sign Up and Sign In POST requests
// ─────────────────────────────────────────────
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Strict',
    'use_strict_mode' => true,
]);

include 'connect.php';

// ── Helpers ──────────────────────────────────

function verify_csrf(): void {
    if (
        empty($_POST['csrf_token']) ||
        empty($_SESSION['csrf_token']) ||
        !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])
    ) {
        http_response_code(403);
        die('Invalid CSRF token. Request blocked.');
    }
}

function check_rate_limit(string $action): void {
    $key    = "rate_{$action}";
    $limit  = 5;
    $window = 900; // 15 minutes

    if (empty($_SESSION[$key])) {
        $_SESSION[$key] = ['count' => 0, 'first' => time()];
    }
    if (time() - $_SESSION[$key]['first'] > $window) {
        $_SESSION[$key] = ['count' => 0, 'first' => time()];
    }
    $_SESSION[$key]['count']++;
    if ($_SESSION[$key]['count'] > $limit) {
        http_response_code(429);
        die('Too many attempts. Please try again in 15 minutes.');
    }
}

// ── SIGN UP ───────────────────────────────────
if (isset($_POST['signUp'])) {

    verify_csrf();
    check_rate_limit('signup');

    $firstName = trim($_POST['fName']    ?? '');
    $lastName  = trim($_POST['lName']    ?? '');
    $email     = trim($_POST['email']    ?? '');
    $password  =      $_POST['password'] ?? '';

    $errors = [];

    if (empty($firstName) || !preg_match('/^[a-zA-ZÀ-ÿ\s\-]{1,50}$/', $firstName)) {
        $errors[] = 'First name is invalid (letters, spaces, hyphens only — max 50 chars).';
    }
    if (empty($lastName) || !preg_match('/^[a-zA-ZÀ-ÿ\s\-]{1,50}$/', $lastName)) {
        $errors[] = 'Last name is invalid (letters, spaces, hyphens only — max 50 chars).';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
        $errors[] = 'Invalid email address.';
    }
    if (strlen($password) < 8) {
        $errors[] = 'Password must be at least 8 characters.';
    }
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = 'Password must contain at least one uppercase letter.';
    }
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = 'Password must contain at least one number.';
    }

    if (!empty($errors)) {
        $_SESSION['signup_errors'] = $errors;
        $_SESSION['old_input']     = ['fName' => $firstName, 'lName' => $lastName, 'email' => $email];
        header('Location: index.php?form=signup');
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    // Check duplicate email
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
    $checkStmt->bind_param('s', $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        $_SESSION['signup_errors'] = ['Email address already exists.'];
        $_SESSION['old_input']     = ['fName' => $firstName, 'lName' => $lastName, 'email' => $email];
        $checkStmt->close();
        header('Location: index.php?form=signup');
        exit();
    }
    $checkStmt->close();

    // Insert new user
    $insertStmt = $conn->prepare(
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)"
    );
    $insertStmt->bind_param('ssss', $firstName, $lastName, $email, $hashedPassword);

    if ($insertStmt->execute()) {
        session_regenerate_id(true);
        $insertStmt->close();
        header('Location: index.php?registered=1');
        exit();
    } else {
        error_log('DB Insert Error: ' . $conn->error);
        $_SESSION['signup_errors'] = ['Registration failed. Please try again.'];
        $insertStmt->close();
        header('Location: index.php?form=signup');
        exit();
    }
}

// ── SIGN IN ───────────────────────────────────
if (isset($_POST['signIn'])) {

    verify_csrf();
    check_rate_limit('signin');

    $email    = trim($_POST['email']    ?? '');
    $password =      $_POST['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($password)) {
        $_SESSION['login_error'] = 'Invalid email or password.';
        header('Location: index.php');
        exit();
    }

    $stmt = $conn->prepare("SELECT id, email, password, firstName, lastName FROM users WHERE email = ? LIMIT 1");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        if (password_verify($password, $row['password'])) {
            session_regenerate_id(true);

            $_SESSION['user_id']   = $row['id'];
            $_SESSION['email']     = $row['email'];
            $_SESSION['firstName'] = $row['firstName'];
            $_SESSION['lastName']  = $row['lastName'];

            unset($_SESSION['rate_signin']);

            $stmt->close();
            header('Location: homepage.php');
            exit();
        }
    }

    $_SESSION['login_error'] = 'Incorrect email or password.';
    $stmt->close();
    header('Location: index.php');
    exit();
}

// Direct visit with no POST — redirect home
header('Location: index.php');
exit();
?>