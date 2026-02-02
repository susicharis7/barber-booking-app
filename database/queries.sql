-- Useful read-only queries for inspecting data

-- Barbers with user info
SELECT
  b.id        AS barber_id,
  b.user_id,
  u.first_name AS "Name",
  u.last_name  AS "Surname",
  u.email,
  u.role,
  b.is_active,
  b.title
FROM barbers b
JOIN users u ON u.id = b.user_id;

-- Total appointments per barber
SELECT
  b.id AS barber_id,
  u.first_name,
  u.last_name,
  COUNT(a.id) AS total_appointments
FROM barbers b
JOIN users u ON u.id = b.user_id
LEFT JOIN appointments a ON a.barber_id = b.id
GROUP BY b.id, u.first_name, u.last_name
ORDER BY total_appointments DESC;

-- Appointments with customer & barber names (function output)
SELECT * FROM get_appointments_clean();
