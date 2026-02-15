import dotenv from 'dotenv';
dotenv.config();

import { pool } from './db/pool';
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL at', res.rows[0].now);
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }
})();



import { markPastAppointmentsCompleted } from './modules/appointments/appointmentsService';
const runEveryMS = 60000;   // 60s

setInterval(async () => {
  try {
    const updated = await markPastAppointmentsCompleted();

    if (updated > 0) {
      console.log(`Marked ${updated} appointments as completed`)
    };
  } catch (err) {
        console.error('Auto-complete appointments failed:', err);

  }
}, runEveryMS)