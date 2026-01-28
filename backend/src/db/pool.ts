import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});


(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL at', res.rows[0].now);
  } catch (err) {
    console.error('PostgreSQL connection failed', err);
  }
})();
