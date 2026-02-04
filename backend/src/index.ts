import dotenv from 'dotenv';
dotenv.config();

import './db/pool';
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Check every minute if the appointment should be completed 
import { markPastAppointmentsCompleted } from './modules/appointments/appointmentsService';
const runEveryMS = 60000;

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