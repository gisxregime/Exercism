<?php
// ─────────────────────────────────────────────
// insert_test.php — tests the full signup flow
// DELETE after fixing!
// ─────────────────────────────────────────────
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = "127.0.0.1";
$user = "root";
$pass = "";
$db   = "login";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
?>
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #ddd; }
  h2   { color: #61dafb; }
  .ok  { color: #4ec94e; }
  .err { color: #ff6b6b; }
  .tip { color: #ffd700; background: #2a2a2a; padding: 10px; border-left: 4px solid #ffd700; margin: 8px 0; border-radius:4px; }
  pre  { background: #2a2a2a; padding: 15px; border-radius: 6px; white-space: pre-wrap; }
  hr   { border-color: #444; }
  .sql { background:#111; color:#a8ff78; padding:15px; border-radius:6px; font-size:13px; }
</style>
</head>
<body>
<h2>🧪 Insert + Schema Test</h2><hr>

<?php
try {
    $conn = new mysqli($host, $user, $pass, $db);
    $conn->set_charset('utf8mb4');
    echo "<span class='ok'>✅ Connected to database '$db'</span><br><br>";
} catch (mysqli_sql_exception $e) {
    die("<span class='err'>❌ Cannot connect: " . htmlspecialchars($e->getMessage()) . "</span>");
}

// ── 1. Show current table structure ──────────
echo "<b>1. Current 'users' table structure:</b><br>";
$result = $conn->query("SHOW TABLES LIKE 'users'");

if ($result->num_rows === 0) {
    echo "<span class='err'>❌ Table 'users' does not exist at all.</span><br>";
    echo "<div class='tip'>Run the CREATE TABLE SQL shown at the bottom of this page.</div>";
} else {
    echo "<pre>";
    $cols     = $conn->query("DESCRIBE users");
    $existing = [];
    while ($col = $cols->fetch_assoc()) {
        $existing[$col['Field']] = $col['Type'];
        printf("  %-15s %s\n", $col['Field'], $col['Type']);
    }
    echo "</pre>";

    // ── 2. Check password column length ──────
    echo "<b>2. Password column length check:</b> ";
    if (isset($existing['password'])) {
        // bcrypt hashes are always 60 chars — column must be at least 60, ideally 255
        preg_match('/\d+/', $existing['password'], $m);
        $len = (int)($m[0] ?? 0);
        if ($len < 60) {
            echo "<span class='err'>❌ password column is $len chars — too short for bcrypt (needs 255)!</span><br>";
            echo "<div class='tip'>👉 Run this SQL in phpMyAdmin to fix it:<br>
            <code>ALTER TABLE users MODIFY password VARCHAR(255) NOT NULL;</code></div>";
        } else {
            echo "<span class='ok'>✅ Length is $len — OK for bcrypt</span><br>";
        }
    } else {
        echo "<span class='err'>❌ 'password' column missing entirely</span><br>";
    }

    // ── 3. Required columns ───────────────────
    echo "<br><b>3. Required columns:</b><br><pre>";
    $required = ['id', 'firstName', 'lastName', 'email', 'password'];
    $allGood  = true;
    foreach ($required as $req) {
        if (array_key_exists($req, $existing)) {
            echo "<span class='ok'>  ✅ $req</span>\n";
        } else {
            echo "<span class='err'>  ❌ $req  ← MISSING</span>\n";
            $allGood = false;
        }
    }
    echo "</pre>";

    // ── 4. Try a real test insert ─────────────
    echo "<b>4. Test INSERT (writes a test row then deletes it):</b><br>";
    $testFirst = 'TestFirst';
    $testLast  = 'TestLast';
    $testEmail = 'test_delete_me_' . time() . '@test.com';
    $testPass  = password_hash('TestPass123', PASSWORD_BCRYPT, ['cost' => 12]);

    try {
        $stmt = $conn->prepare(
            "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)"
        );
        $stmt->bind_param('ssss', $testFirst, $testLast, $testEmail, $testPass);
        $stmt->execute();
        $insertedId = $conn->insert_id;
        $stmt->close();
        echo "<span class='ok'>✅ INSERT succeeded! Row ID: $insertedId</span><br>";

        // Clean up test row
        $del = $conn->prepare("DELETE FROM users WHERE id = ?");
        $del->bind_param('i', $insertedId);
        $del->execute();
        $del->close();
        echo "<span class='ok'>✅ Test row cleaned up (deleted)</span><br>";

        echo "<br><div class='tip' style='border-color:#4ec94e;color:#4ec94e'>
        🎉 <b>Database writes are working!</b><br>
        The problem is in your PHP form/auth logic, not the database.<br>
        Check the auth.php section below for common causes.
        </div>";

    } catch (mysqli_sql_exception $e) {
        echo "<span class='err'>❌ INSERT failed: " . htmlspecialchars($e->getMessage()) . "</span><br>";
        echo "<div class='tip'>Error code: <b>" . $e->getCode() . "</b><br>";
        if ($e->getCode() == 1062) {
            echo "👉 Duplicate entry — unique constraint on email. That's fine, test email already exists.";
        } elseif ($e->getCode() == 1054) {
            echo "👉 Unknown column — your column names don't match. Check step 3 above.";
        } elseif ($e->getCode() == 1406) {
            echo "👉 Data too long — a column is too short. Check password column length in step 2.";
        }
        echo "</div>";
    }
}

// ── 5. Show current rows ──────────────────────
echo "<br><b>5. Current rows in 'users' table:</b><br>";
$rows = $conn->query("SELECT id, firstName, lastName, email, LEFT(password,20) AS pass_preview, created_at FROM users");
if ($rows->num_rows === 0) {
    echo "<span class='err'>  No rows found — table is empty.</span><br>";
    echo "<div class='tip'>This confirms data is not being inserted. The issue is in auth.php or the form POST.</div>";
} else {
    echo "<pre>";
    printf("  %-5s %-12s %-12s %-30s %-22s %s\n", 'ID', 'First', 'Last', 'Email', 'Pass (preview)', 'Created');
    echo str_repeat('-', 95) . "\n";
    while ($row = $rows->fetch_assoc()) {
        printf("  %-5s %-12s %-12s %-30s %-22s %s\n",
            $row['id'], $row['firstName'], $row['lastName'],
            $row['email'], $row['pass_preview'] . '...', $row['created_at'] ?? 'n/a'
        );
    }
    echo "</pre>";
}

$conn->close();
?>

<br><hr>
<h2>🛠 Recreate Table SQL (run in phpMyAdmin if needed)</h2>
<pre class="sql">-- Drop old table (WARNING: deletes all data) and recreate with correct schema
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id`         INT(11)      NOT NULL AUTO_INCREMENT,
  `firstName`  VARCHAR(50)  NOT NULL,
  `lastName`   VARCHAR(50)  NOT NULL,
  `email`      VARCHAR(254) NOT NULL,
  `password`   VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;</pre>

<br>
<p style="color:#ff6b6b"><b>⚠️ DELETE insert_test.php from your server when done!</b></p>
</body>
</html>