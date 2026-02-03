import { pool } from '../../db/pool';
import  type { CreateAppointmentData }  from '../../types/types';

export const getUpcomingAppointments = async (firebaseUid: string) => {
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
    ORDER BY a.date ASC, a.start_time ASC
    `,
    [firebaseUid]
  );

  return result.rows;
};

export const getPastAppointments = async (firebaseUid: string) => {
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
    ORDER BY a.date DESC, a.start_time DESC
    `,
    [firebaseUid]
  );

  return result.rows;
};

export const createAppointmentByUid = async (
  firebaseUid: string,
  data: CreateAppointmentData
) => {
  const { barber_id, service_id, date, start_time, note = null } = data;

  const hasConflict = await hasAppointmentConflict(
    barber_id,
    date,
    start_time,
    service_id
  );

  if (hasConflict) {
    return null;
  }

  const result = await pool.query(
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

  return result.rows[0] || null;
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
  serviceId: number
) => {
  const result = await pool.query(
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

