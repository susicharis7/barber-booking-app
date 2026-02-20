import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { pool } from './db/pool';
import { markPastAppointmentsCompleted } from './modules/appointments/appointmentsService';
import { logger } from './core/logging/logger';

const PORT = Number(process.env.PORT || 5000);
const runEveryMs = 60_000;

const server = app.listen(PORT, () => {
  logger.info('Server started', { port: PORT });
});

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    logger.info('Connected to PostgreSQL', { now: result.rows[0].now });
  } catch (error) {
    logger.error('PostgreSQL connection failed', { error: String(error) });
    process.exit(1);
  }
})();

setInterval(async () => {
  try {
    const updated = await markPastAppointmentsCompleted();
    if (updated > 0) {
      logger.info('Auto-completed appointments', { updated });
    }
  } catch (error) {
    logger.error('Auto-complete appointments failed', { error: String(error) });
  }
}, runEveryMs);

const gracefulShutdown = (signal: string) => {
  logger.warn('Shutdown signal received', { signal });
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
