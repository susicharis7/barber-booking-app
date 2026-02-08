import type { Pool } from 'pg';
import { pool } from './pool';

export type QueryExecutor = Pick<Pool, 'query'>;

export const toDateLockKey = (date: string) => Number(date.replace(/-/g, ''));

export const barberExists = async (
  barberId: number,
  db: QueryExecutor = pool
) => {
  const result = await db.query(
    `SELECT 1 FROM barbers WHERE id = $1 LIMIT 1`,
    [barberId]
  );
  return (result.rowCount ?? 0) > 0;
};

export const serviceExists = async (
  serviceId: number,
  db: QueryExecutor = pool
) => {
  const result = await db.query(
    `SELECT 1 FROM services WHERE id = $1 LIMIT 1`,
    [serviceId]
  );
  return (result.rowCount ?? 0) > 0;
};


