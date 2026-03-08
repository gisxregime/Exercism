-- LaagTa Seed Data (Development Only)
-- Run AFTER schema.sql
USE laagta_db;

-- Passwords are all: Password123!
INSERT INTO users (name, email, password_hash, role, bio, location, specialty) VALUES
('Juan dela Cruz',  'juan@laagta.ph',   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tawo',  'Adventure seeker from Davao.',   'Davao City',  NULL),
('Maria Santos',    'maria@laagta.ph',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tawo',  'Nature lover and photographer.',  'Cebu City',   NULL),
('Kuya Ben Reyes',  'ben@laagta.ph',    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Giya',  'Certified island hopping guide with 10 years experience in Samal Island.', 'Samal Island', 'Island Hopping, Snorkeling'),
('Ate Gina Lopez',  'gina@laagta.ph',   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWgi', 'Giya',  'Expert trekking guide around Mt. Apo foothills.', 'Davao City',   'Trekking, Camping, Birdwatching');

INSERT INTO listings (guide_id, title, description, location, price, duration, max_group_size, category) VALUES
(3, 'Samal Island Hopping Tour',      'Explore 4 pristine islands around Samal with snorkeling gear included.',      'Samal Island, Davao del Norte', 850.00,  'Full Day (8 hrs)',    10, 'Island Hopping'),
(3, 'Coral Reef Snorkeling',          'Dive into the clear waters of Samal and witness vibrant coral reefs.',         'Samal Island, Davao del Norte', 600.00,  'Half Day (4 hrs)',     8, 'Snorkeling'),
(4, 'Mt. Apo Foothills Trekking',     'A moderate trek through lush rainforest with stunning valley views.',          'Davao City',                    1200.00, 'Full Day (9 hrs)',     6, 'Trekking'),
(4, 'Birdwatching at Eden Nature Park','Spot endemic Philippine Eagle and other rare birds in their natural habitat.', 'Davao City',                    750.00,  '3 Hours',              5, 'Birdwatching');

INSERT INTO bookings (tawo_id, guide_id, listing_id, date, group_size, payment_method, total_price, status) VALUES
(1, 3, 1, '2026-03-15', 2, 'GCash',  1700.00, 'confirmed'),
(2, 4, 3, '2026-03-20', 3, 'Cash',   3600.00, 'pending'),
(1, 3, 2, '2026-02-10', 1, 'Card',   600.00,  'completed');

INSERT INTO ratings (booking_id, tawo_id, guide_id, stars, comment) VALUES
(3, 1, 3, 5, 'Kuya Ben was amazing! The coral reefs were breathtaking and he made sure everyone was safe. Highly recommend!');

INSERT INTO messages (sender_id, receiver_id, content) VALUES
(1, 3, 'Hi Kuya Ben! Is the island hopping tour available on March 15?'),
(3, 1, 'Yes po! Confirmed na. Meet at Babak Port at 7:00 AM. Bring sunscreen!'),
(1, 3, 'Perfect! See you then!');
