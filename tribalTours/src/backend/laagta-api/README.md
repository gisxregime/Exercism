# LaagTa PHP Backend API

> REST API for the LaagTa tour-guide booking platform built with pure PHP + MySQL.

---

## Tech Stack

- PHP 8.1+
- MySQL 8.0+ / MariaDB 10.6+
- Apache with `mod_rewrite` (or Nginx)

---

## Project Structure

```
laagta-api/
├── index.php                  # Front controller / router
├── .htaccess                  # Apache rewrite rules
├── config/
│   └── database.php           # DB connection + credentials
├── middleware/
│   └── auth.php               # JWT generation & verification
├── helpers/
│   └── response.php           # CORS, json helpers
├── controllers/
│   ├── AuthController.php     # Register, Login, Logout
│   ├── UserController.php     # Get/Update profile
│   ├── GuideController.php    # Browse & view guides
│   ├── ListingController.php  # CRUD for tour listings
│   ├── BookingController.php  # Create & manage bookings
│   ├── RatingController.php   # Submit ratings
│   └── MessageController.php  # Conversations & messages
└── database/
    ├── schema.sql             # Table definitions
    └── seed.sql               # Sample data
```

---

## Setup

### 1. Create the database

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p laagta_db < database/seed.sql   # optional dev data
```

### 2. Configure credentials

Edit `config/database.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
define('DB_NAME', 'laagta_db');
```

Edit `middleware/auth.php`:

```php
define('JWT_SECRET', 'change_this_to_a_long_random_string');
```

### 3. Deploy to server

Upload the project folder to your Apache/Nginx `public_html` or `www` root.

Make sure `mod_rewrite` is enabled:

```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

---

## API Reference

**Base URL:** `https://yourdomain.com/api/v1`

All responses return JSON. Authenticated routes require:
```
Authorization: Bearer <token>
```

---

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login and receive token |
| POST | `/auth/logout` | Yes | Logout (client discards token) |

**Register body:**
```json
{ "name": "Juan", "email": "juan@example.com", "password": "Password123!", "role": "Tawo" }
```
Roles: `Tawo` (tourist) or `Giya` (guide)

---

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/me` | Yes | Get current user profile |
| PUT | `/users/me` | Yes | Update profile |

---

### Guides

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/guides` | No | List all guides |
| GET | `/guides/:id` | No | Guide profile, listings & reviews |

**Query params:** `?location=Samal&specialty=Island Hopping`

---

### Listings

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/listings` | No | Any | Browse all listings |
| GET | `/listings/:id` | No | Any | Single listing detail |
| POST | `/listings` | Yes | Giya | Create listing |
| PUT | `/listings/:id` | Yes | Giya (owner) | Update listing |
| DELETE | `/listings/:id` | Yes | Giya (owner) | Delete listing |

**Query params:** `?location=Samal&category=Island Hopping`

---

### Bookings

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/bookings` | Yes | Any | Get user's bookings |
| POST | `/bookings` | Yes | Tawo | Create a booking |
| PUT | `/bookings/:id/status` | Yes | Owner/Guide | Update booking status |

**Status values:** `confirmed` · `completed` · `cancelled`

---

### Ratings

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/ratings` | Yes | Tawo | Rate a completed booking |

---

### Messages

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/messages/conversations` | Yes | List all conversations |
| GET | `/messages/:userId` | Yes | Get thread with a user |
| POST | `/messages` | Yes | Send a message |

---

## Seed Accounts (dev only)

All passwords: `Password123!`

| Name | Email | Role |
|------|-------|------|
| Juan dela Cruz | juan@laagta.ph | Tawo |
| Maria Santos | maria@laagta.ph | Tawo |
| Kuya Ben Reyes | ben@laagta.ph | Giya |
| Ate Gina Lopez | gina@laagta.ph | Giya |

---

## Security Notes

- Passwords hashed with `bcrypt` via `password_hash()`
- JWT tokens expire after **7 days**
- All inputs are sanitized; queries use **prepared statements** (no SQL injection)
- Change `JWT_SECRET` before deploying to production
- Enable HTTPS on your server — never send tokens over plain HTTP
