<?php
// Start session with secure options
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Strict',
    'use_strict_mode' => true,
]);

// Generate CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrf = htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8');

// If already logged in, go straight to homepage
if (isset($_SESSION['user_id'])) {
    header('Location: homepage.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registry &amp; Login</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- ── SIGN UP FORM ── -->
<div class="container" id="signUp" style="display:none;">
  <h1 class="form-title">Register</h1>

  <!-- Show validation errors if any -->
  <?php if (isset($_SESSION['signup_errors'])): ?>
    <div class="error-box">
      <?php foreach ($_SESSION['signup_errors'] as $err): ?>
        <p><?php echo htmlspecialchars($err, ENT_QUOTES, 'UTF-8'); ?></p>
      <?php endforeach; ?>
    </div>
    <?php unset($_SESSION['signup_errors']); ?>
  <?php endif; ?>

  <form method="post" action="auth.php">
    <input type="hidden" name="csrf_token" value="<?php echo $csrf; ?>">
    <div class="input-group">
      <i class="fas fa-user"></i>
      <input type="text" name="fName" id="fName" placeholder="First Name"
             value="<?php echo htmlspecialchars($_SESSION['old_input']['fName'] ?? '', ENT_QUOTES, 'UTF-8'); ?>" required>
      <label for="fName">First Name</label>
    </div>
    <div class="input-group">
      <i class="fas fa-user"></i>
      <input type="text" name="lName" id="lName" placeholder="Last Name"
             value="<?php echo htmlspecialchars($_SESSION['old_input']['lName'] ?? '', ENT_QUOTES, 'UTF-8'); ?>" required>
      <label for="lName">Last Name</label>
    </div>
    <div class="input-group">
      <i class="fas fa-envelope"></i>
      <input type="email" name="email" id="su-email" placeholder="Email"
             value="<?php echo htmlspecialchars($_SESSION['old_input']['email'] ?? '', ENT_QUOTES, 'UTF-8'); ?>" required>
      <label for="su-email">Email</label>
    </div>
    <div class="input-group">
      <i class="fas fa-lock"></i>
      <input type="password" name="password" id="su-password" placeholder="Password" required>
      <label for="su-password">Password</label>
    </div>
    <?php unset($_SESSION['old_input']); ?>
    <input type="submit" class="btn" value="Sign Up" name="signUp">
  </form>
  <p class="or">----------or--------</p>
  <div class="icons">
    <i class="fab fa-google"></i>
    <i class="fab fa-facebook"></i>
  </div>
  <div class="links">
    <p>Already Have Account?</p>
    <button id="signInButton">Sign In</button>
  </div>
</div>

<!-- ── SIGN IN FORM ── -->
<div class="container" id="signIn">
  <h1 class="form-title">Sign In</h1>

  <!-- Show login error if any -->
  <?php if (isset($_SESSION['login_error'])): ?>
    <div class="error-box">
      <p><?php echo htmlspecialchars($_SESSION['login_error'], ENT_QUOTES, 'UTF-8'); ?></p>
    </div>
    <?php unset($_SESSION['login_error']); ?>
  <?php endif; ?>

  <form method="post" action="auth.php">
    <input type="hidden" name="csrf_token" value="<?php echo $csrf; ?>">
    <div class="input-group">
      <i class="fas fa-envelope"></i>
      <input type="email" name="email" id="si-email" placeholder="Email" required>
      <label for="si-email">Email</label>
    </div>
    <div class="input-group">
      <i class="fas fa-lock"></i>
      <input type="password" name="password" id="si-password" placeholder="Password" required>
      <label for="si-password">Password</label>
    </div>
    <p class="recover"><a href="#">Recover Password</a></p>
    <input type="submit" class="btn" value="Sign In" name="signIn">
  </form>
  <p class="or">----------or--------</p>
  <div class="icons">
    <i class="fab fa-google"></i>
    <i class="fab fa-facebook"></i>
  </div>
  <div class="links">
    <p>Don't have an account yet?</p>
    <button id="signUpButton">Sign Up</button>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>