<?php
// ─────────────────────────────────────────────
// homepage.php — protected page, login required
// ─────────────────────────────────────────────
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Strict',
    'use_strict_mode' => true,
]);

// Guard: redirect to login if not authenticated
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit();
}

// Safely pull from session (already sanitized at login, but escape on output)
$firstName = htmlspecialchars($_SESSION['firstName'] ?? '', ENT_QUOTES, 'UTF-8');
$lastName  = htmlspecialchars($_SESSION['lastName']  ?? '', ENT_QUOTES, 'UTF-8');
$email     = htmlspecialchars($_SESSION['email']     ?? '', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: "Poppins", sans-serif; }

        body {
            background: linear-gradient(to right, #e2e2e2, #c9d6ff);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 20px 35px rgba(0,0,1,0.15);
            padding: 3rem 4rem;
            text-align: center;
            max-width: 500px;
            width: 90%;
        }

        .card h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: #333;
        }

        .card p {
            color: #757575;
            font-size: 1rem;
            margin-bottom: 2rem;
        }

        .logout-btn {
            display: inline-block;
            padding: 10px 30px;
            background: rgb(125, 125, 235);
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s;
        }

        .logout-btn:hover {
            background: #07001f;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Hello, <?php echo $firstName . ' ' . $lastName; ?> 👋</h1>
        <p>Logged in as <?php echo $email; ?></p>
        <a href="logout.php" class="logout-btn">Logout</a>
    </div>
</body>
</html>