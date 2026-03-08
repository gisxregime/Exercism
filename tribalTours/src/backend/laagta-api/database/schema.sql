-- LaagTa Database Schema
-- Run this file once to set up all tables.

CREATE DATABASE IF NOT EXISTS laagta_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE laagta_db;

-- ─────────────────────────────────────────────
-- USERS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    email         VARCHAR(191)  NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,
    role          ENUM('Tawo','Giya') NOT NULL,
    bio           TEXT,
    location      VARCHAR(150),
    phone         VARCHAR(30),
    specialty     VARCHAR(150),        -- Giya only: e.g. "Island Hopping, Trekking"
    profile_photo VARCHAR(500),
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role  (role)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────
-- LISTINGS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS listings (
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    guide_id       INT UNSIGNED NOT NULL,
    title          VARCHAR(200) NOT NULL,
    description    TEXT         NOT NULL,
    location       VARCHAR(150) NOT NULL,
    price          DECIMAL(10,2) NOT NULL,
    duration       VARCHAR(100) NOT NULL,    -- e.g. "Full Day (8 hrs)"
    max_group_size TINYINT UNSIGNED DEFAULT 0,  -- 0 = unlimited
    category       VARCHAR(100) NOT NULL,    -- e.g. "Island Hopping"
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guide_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_guide    (guide_id),
    INDEX idx_location (location),
    INDEX idx_category (category)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────
-- BOOKINGS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tawo_id        INT UNSIGNED NOT NULL,
    guide_id       INT UNSIGNED NOT NULL,
    listing_id     INT UNSIGNED NOT NULL,
    date           DATE NOT NULL,
    group_size     TINYINT UNSIGNED NOT NULL DEFAULT 1,
    payment_method VARCHAR(50)   NOT NULL,   -- e.g. "GCash", "Cash", "Card"
    total_price    DECIMAL(10,2) NOT NULL,
    status         ENUM('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tawo_id)    REFERENCES users(id)    ON DELETE CASCADE,
    FOREIGN KEY (guide_id)   REFERENCES users(id)    ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    INDEX idx_tawo    (tawo_id),
    INDEX idx_guide   (guide_id),
    INDEX idx_listing (listing_id),
    INDEX idx_status  (status)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────
-- RATINGS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ratings (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id INT UNSIGNED NOT NULL UNIQUE,  -- one rating per booking
    tawo_id    INT UNSIGNED NOT NULL,
    guide_id   INT UNSIGNED NOT NULL,
    stars      TINYINT UNSIGNED NOT NULL CHECK (stars BETWEEN 1 AND 5),
    comment    TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (tawo_id)    REFERENCES users(id)    ON DELETE CASCADE,
    FOREIGN KEY (guide_id)   REFERENCES users(id)    ON DELETE CASCADE,
    INDEX idx_guide (guide_id)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────
-- MESSAGES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sender_id   INT UNSIGNED NOT NULL,
    receiver_id INT UNSIGNED NOT NULL,
    content     TEXT         NOT NULL,
    is_read     TINYINT(1)   NOT NULL DEFAULT 0,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id)   REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_sender   (sender_id),
    INDEX idx_receiver (receiver_id),
    INDEX idx_thread   (sender_id, receiver_id)
) ENGINE=InnoDB;
