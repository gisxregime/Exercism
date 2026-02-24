<?php
// ─────────────────────────────────────────────
// connect.php
// ─────────────────────────────────────────────

// ── Set to false on live/production server ──
define('LOCAL_DEV', true);

$host = "127.0.0.1"; // IP instead of "localhost" avoids socket issues on some setups
$user = "root";
$pass = "";           // XAMPP default: empty. WAMP default: empty.
$db   = "login";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($host, $user, $pass, $db);
    $conn->set_charset('utf8mb4');
} catch (mysqli_sql_exception $e) {
    error_log("DB Connection Error: " . $e->getMessage());

    if (LOCAL_DEV) {
        // Show full error locally so you can debug
        die("<pre style='color:red;padding:20px'>
<b>Database Connection Failed</b>
Error : " . htmlspecialchars($e->getMessage()) . "
Code  : " . $e->getCode() . "

Common fixes:
  2002 / 2003 → MySQL is not running. Start it in XAMPP/WAMP Control Panel.
  1045        → Wrong username or password.
  1049        → Database 'login' does not exist. Create it in phpMyAdmin.

Run deep_test.php for a step-by-step diagnosis.
</pre>");
    } else {
        http_response_code(500);
        die("Unable to connect to the database. Please try again later.");
    }
}
?>