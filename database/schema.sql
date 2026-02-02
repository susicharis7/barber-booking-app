-- barber-booking-app database schema
-- This file defines tables, constraints, indexes, and a helper view.

BEGIN;

-- Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    phone VARCHAR(30),
    role VARCHAR(20) NOT NULL DEFAULT 'customer',
    CONSTRAINT users_role_check CHECK (role IN ('customer', 'barber', 'admin'))
);

-- Barbers
CREATE TABLE IF NOT EXISTS barbers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) DEFAULT 'Barber',
    bio TEXT,
    avatar_url VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    barber_id INTEGER REFERENCES barbers(id) ON DELETE SET NULL,
    service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT appointments_status_check CHECK (status IN ('confirmed', 'completed', 'cancelled'))
);

-- Working hours
CREATE TABLE IF NOT EXISTS working_hours (
    id SERIAL PRIMARY KEY,
    barber_id INTEGER REFERENCES barbers(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_working BOOLEAN NOT NULL DEFAULT true,
    UNIQUE (barber_id, day_of_week)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_barber ON appointments(barber_id);
CREATE INDEX IF NOT EXISTS idx_appointments_customer ON appointments(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- Helper view: barbers with user info
CREATE OR REPLACE VIEW barbers_with_user AS
SELECT
    b.id AS barber_id,
    b.user_id,
    b.title,
    b.bio,
    b.avatar_url,
    b.is_active,
    b.created_at,
    u.first_name,
    u.last_name,
    u.email,
    u.role
FROM barbers b
JOIN users u ON u.id = b.user_id;

-- Appointments with customer & barber names (function output)
CREATE OR REPLACE FUNCTION get_appointments_clean()
RETURNS TABLE (
  appointment_id INT,
  date DATE,
  start_time TIME,
  end_time TIME,
  status VARCHAR,
  customer_name TEXT,
  barber_name TEXT,
  barber_title VARCHAR,
  service_name VARCHAR,
  service_duration INT,
  service_price NUMERIC,
  note TEXT
) AS $$
  SELECT
    a.id AS appointment_id,
    a.date,
    a.start_time,
    a.end_time,
    a.status,
    CONCAT(cu.first_name, ' ', cu.last_name) AS customer_name,
    CONCAT(bu.first_name, ' ', bu.last_name) AS barber_name,
    b.title AS barber_title,
    s.name AS service_name,
    s.duration AS service_duration,
    s.price AS service_price,
    a.note
  FROM appointments a
  LEFT JOIN users cu ON cu.id = a.customer_id
  LEFT JOIN barbers b ON b.id = a.barber_id
  LEFT JOIN users bu ON bu.id = b.user_id
  LEFT JOIN services s ON s.id = a.service_id
  ORDER BY a.date DESC, a.start_time DESC;
$$ LANGUAGE sql;

COMMIT;
