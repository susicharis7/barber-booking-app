CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_users_role_blocked_created_id
  ON users (role, is_blocked, created_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS idx_users_name_trgm
  ON users USING gin (LOWER(first_name || ' ' || last_name) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_users_email_trgm
  ON users USING gin (LOWER(email) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_appointments_customer_date_time_id
  ON appointments (customer_id, date DESC, start_time DESC, id DESC);
