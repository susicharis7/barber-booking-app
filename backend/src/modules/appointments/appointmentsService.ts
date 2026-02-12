import { pool } from '../../db/pool';
import  type { CreateAppointmentData }  from '../../types/types';
import { parseCursor, makeCursor } from './helperFunctions';
import { QueryExecutor, toDateLockKey } from '../../db/repositoryUtils';




export const getUpcomingAppointments = async (
  firebaseUid: string,
  limit = 5,
  cursor?: string
) => {
  const parsed = parseCursor(cursor);
  const pageSize = Math.min(Math.max(limit, 1), 50);
  const limitPlus = pageSize + 1;


  const result = await pool.query(
    `
    SELECT
      a.id,
      a.date,
      a.start_time,
      a.end_time,
      a.status,
      a.note,
      json_build_object(
        'id', cu.id,
        'first_name', cu.first_name,
        'last_name', cu.last_name,
        'email', cu.email
      ) AS customer,
      json_build_object(
        'id', b.id,
        'first_name', bu.first_name,
        'last_name', bu.last_name,
        'title', b.title
      ) AS barber,
      json_build_object(
        'id', s.id,
        'name', s.name,
        'duration', s.duration,
        'price', s.price
      ) AS service
    FROM appointments a
    JOIN users cu ON cu.id = a.customer_id
    JOIN barbers b ON b.id = a.barber_id
    JOIN users bu ON bu.id = b.user_id
    JOIN services s ON s.id = a.service_id
    WHERE cu.firebase_uid = $1
      AND a.status = 'confirmed'
      AND (a.date > CURRENT_DATE OR (a.date = CURRENT_DATE AND a.end_time > CURRENT_TIME))
      AND (
        $2::date IS NULL OR 
        (a.date, a.start_time, a.id) > ($2::date, $3::time, $4::int)
      )
    ORDER BY a.date ASC, a.start_time ASC, a.id ASC
    LIMIT $5
    `,
    [firebaseUid, parsed?.date ?? null, parsed?.time ?? null, parsed?.id ?? null, limitPlus]
  );

  const rows = result.rows;
  const hasMore = rows.length > pageSize;
  if (hasMore) rows.pop();

  const nextCursor = hasMore ? makeCursor(rows[rows.length - 1]) : null;

  return { appointments: rows, nextCursor};
};

export const getPastAppointments = async (
  firebaseUid: string,
  limit = 5,
  cursor?: string
) => {
  const parsed = parseCursor(cursor);
  const pageSize = Math.min(Math.max(limit, 1), 50);
  const limitPlus = pageSize + 1;


  const result = await pool.query(
    `
    SELECT
      a.id,
      a.date,
      a.start_time,
      a.end_time,
      a.status,
      a.note,
      json_build_object(
        'id', cu.id,
        'first_name', cu.first_name,
        'last_name', cu.last_name,
        'email', cu.email
      ) AS customer,
      json_build_object(
        'id', b.id,
        'first_name', bu.first_name,
        'last_name', bu.last_name,
        'title', b.title
      ) AS barber,
      json_build_object(
        'id', s.id,
        'name', s.name,
        'duration', s.duration,
        'price', s.price
      ) AS service
    FROM appointments a
    JOIN users cu ON cu.id = a.customer_id
    JOIN barbers b ON b.id = a.barber_id
    JOIN users bu ON bu.id = b.user_id
    JOIN services s ON s.id = a.service_id
    WHERE cu.firebase_uid = $1
      AND a.status IN ('completed', 'cancelled')
      AND (
        $2::date IS NULL OR
        (a.date, a.start_time, a.id) < ($2::date, $3::time, $4::int)
      )
    ORDER BY a.date DESC, a.start_time DESC, a.id DESC
    LIMIT $5
    `,
    [firebaseUid, parsed?.date ?? null, parsed?.time ?? null, parsed?.id ?? null, limitPlus]
  );

  const rows = result.rows;
  const hasMore = rows.length > pageSize;
  if (hasMore) rows.pop();

  const nextCursor = hasMore ? makeCursor(rows[rows.length - 1]) : null;

  return { appointments: rows, nextCursor };
};

export const createAppointmentByUid = async (
  firebaseUid: string,
  data: CreateAppointmentData
) => {
  const { barber_id, service_id, date, start_time, note = null } = data;

  const client = await pool.connect();
  const dateLockKey = toDateLockKey(date);

  try {
    await client.query('BEGIN');

    // Serialize booking attempts per barber + date.
    await client.query(
      'SELECT pg_advisory_xact_lock($1::int, $2::int)',
      [barber_id, dateLockKey]
    );

    const hasConflict = await hasAppointmentConflict(
      barber_id,
      date,
      start_time,
      service_id,
      client
    );

    if (hasConflict) {
      await client.query('ROLLBACK');
      return null;
    }

    const result = await client.query(
      `
      WITH new_appt AS (
        INSERT INTO appointments (
          customer_id, barber_id, service_id, date, start_time, end_time, status, note
        )
        SELECT
          u.id,
          $2,
          $3,
          $4::date,
          $5::time,
          ($5::time + (s.duration || ' minutes')::interval)::time,
          'confirmed',
          $6
        FROM users u
        JOIN services s ON s.id = $3
        WHERE u.firebase_uid = $1
        RETURNING *
      )
      SELECT
        a.id,
        a.date,
        a.start_time,
        a.end_time,
        a.status,
        a.note,
        json_build_object(
          'id', cu.id,
          'first_name', cu.first_name,
          'last_name', cu.last_name,
          'email', cu.email
        ) AS customer,
        json_build_object(
          'id', b.id,
          'first_name', bu.first_name,
          'last_name', bu.last_name,
          'title', b.title
        ) AS barber,
        json_build_object(
          'id', s.id,
          'name', s.name,
          'duration', s.duration,
          'price', s.price
        ) AS service
      FROM new_appt a
      JOIN users cu ON cu.id = a.customer_id
      JOIN barbers b ON b.id = a.barber_id
      JOIN users bu ON bu.id = b.user_id
      JOIN services s ON s.id = a.service_id
      `,
      [firebaseUid, barber_id, service_id, date, start_time, note]
    );

    await client.query('COMMIT');
    return result.rows[0] || null;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // ignore rollback errors
    }
    throw error;
  } finally {
    client.release();
  }
};


export const cancelAppointmentByUid = async (
    firebaseUid: string,
    appointmentId: number 
) => {
    const result = await pool.query(`
        UPDATE appointments a 
        SET status = 'cancelled' 
        FROM users u 
        WHERE a.customer_id = u.id
            AND u.firebase_uid = $1
            AND a.id = $2
            AND a.status = 'confirmed'
        RETURNING a.id, a.status    
    `, [firebaseUid, appointmentId]);

    return result.rows[0] || null;
};

/* No double reservations for the same date & time */
export const hasAppointmentConflict = async (
  barberId: number,
  date: string,
  startTime: string,
  serviceId: number,
  db: QueryExecutor = pool
) => {
  const result = await db.query(
    `
    SELECT 1
    FROM appointments a
    JOIN services s ON s.id = $4
    WHERE a.barber_id = $1
      AND a.date = $2::date
      AND a.status = 'confirmed'
      AND NOT (
        a.end_time <= $3::time OR
        a.start_time >= ($3::time + (s.duration || ' minutes')::interval)::time
      )
    LIMIT 1
    `,
    [barberId, date, startTime, serviceId]
  );

  return (result.rowCount ?? 0) > 0;
};

export const getBookedTimesForBarber = async (
  barberId: number,
  date: string
) => {
  const result = await pool.query(
    `
    SELECT start_time, end_time
    FROM appointments
    WHERE barber_id = $1
      AND date = $2::date
      AND status = 'confirmed'
    `,
    [barberId, date]
  );

  return result.rows;
};

/* Reservation finished? - Update it to 'completed' status */
export const markPastAppointmentsCompleted = async () => {
  const result = await pool.query(`
    UPDATE appointments
    SET status = 'completed'
    WHERE status = 'confirmed' 
      AND (
        date < CURRENT_DATE  
        OR (date = CURRENT_DATE AND end_time <= CURRENT_TIME)
      )  
    RETURNING id
  `);

  return result.rowCount ?? 0;
}

export const isWithinBarberWorkingHours = async (
  barberId: number,
  date: string,
  startTime: string,
  serviceId: number,
  db: QueryExecutor = pool
) => {
  const result = await db.query(
    `
    SELECT 1
    FROM working_hours wh
    JOIN services s ON s.id = $4
    WHERE wh.barber_id = $1
      AND wh.day_of_week = EXTRACT(DOW FROM $2::date)::int
      AND wh.is_working = true
      AND $3::time >= wh.start_time
      AND ($3::time + (s.duration || ' minutes')::interval)::time <= wh.end_time
    LIMIT 1
    `,
    [barberId, date, startTime, serviceId]
  );

  return (result.rowCount ?? 0) > 0;
};
