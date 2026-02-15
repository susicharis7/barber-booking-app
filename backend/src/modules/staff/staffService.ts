import { pool } from '../../db/pool';
import { StaffDashboardOverview } from '../../types/types';
import { makeCursor, parseCursor } from '../appointments/helperFunctions';

export const getDashboardOverview = async (): Promise<StaffDashboardOverview> => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*)::int FROM users) AS users_total,
      (SELECT COUNT(*)::int FROM users WHERE role = 'customer') AS customers_total,
      (SELECT COUNT(*)::int FROM users WHERE role = 'barber') AS barbers_total,
      (SELECT COUNT(*)::int FROM users WHERE role = 'admin') AS admins_total,
      (SELECT COUNT(*)::int FROM users WHERE role IN ('barber', 'admin')) AS staff_total,
      (SELECT COUNT(*)::int FROM appointments WHERE date = CURRENT_DATE) AS appointments_today,
      (
        SELECT COUNT(*)::int
        FROM appointments
        WHERE status = 'confirmed'
          AND (
            date > CURRENT_DATE
            OR (date = CURRENT_DATE AND end_time > CURRENT_TIME)
          )
      ) AS upcoming_confirmed,
      (SELECT COUNT(*)::int FROM waiting_list WHERE status = 'active') AS waiting_list_active
  `);

  return result.rows[0];
};

type GetMyAppointmentsOptions = {
  limit?: number;
  cursor?: string;
  date?: string;
};

export const getMyAppointments = async (
  firebaseUid: string,
  options: GetMyAppointmentsOptions = {}
) => {
  const parsed = parseCursor(options.cursor);
  const safeLimit = Math.min(Math.max(options.limit ?? 5, 1), 50);
  const limitPlus = safeLimit + 1;

  const result = await pool.query(
    `
    SELECT
      a.id AS appointment_id,
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
        'id', s.id,
        'name', s.name,
        'duration', s.duration,
        'price', s.price
      ) AS service
    FROM appointments a
    JOIN barbers b ON b.id = a.barber_id
    JOIN users bu ON bu.id = b.user_id
    LEFT JOIN users cu ON cu.id = a.customer_id
    LEFT JOIN services s ON s.id = a.service_id
    WHERE bu.firebase_uid = $1
      AND b.is_active = true
      AND ($2::date IS NULL OR a.date = $2::date)
      AND (
        $3::date IS NULL OR
        (a.date, a.start_time, a.id) < ($3::date, $4::time, $5::int)
      )
    ORDER BY a.date DESC, a.start_time DESC, a.id DESC
    LIMIT $6
    `,
    [
      firebaseUid,
      options.date ?? null,
      parsed?.date ?? null,
      parsed?.time ?? null,
      parsed?.id ?? null,
      limitPlus,
    ]
  );

  const rows = result.rows;
  const hasMore = rows.length > safeLimit;
  if (hasMore) rows.pop();

  const nextCursor = hasMore
    ? makeCursor({
        date: rows[rows.length - 1].date,
        start_time: rows[rows.length - 1].start_time,
        id: rows[rows.length - 1].appointment_id,
      })
    : null;

  return { appointments: rows, nextCursor };
};

export const getMyAppointmentDays = async (
  firebaseUid: string,
  fromDate: string,
  toDate: string
) => {
  const result = await pool.query(
    `
    SELECT a.date, COUNT(*)::int AS count
    FROM appointments a
    JOIN barbers b ON b.id = a.barber_id
    JOIN users bu ON bu.id = b.user_id
    WHERE bu.firebase_uid = $1
      AND b.is_active = true  
      AND a.date BETWEEN $2::date AND $3::date
    GROUP BY a.date
    ORDER BY a.date ASC
    `,
    [firebaseUid, fromDate, toDate]
  );

  return result.rows as Array<{ date: string; count: number }>;
};

export const cancelMyAppointment = async (
  firebaseUid: string,
  appointmentId: number
) => {
  const result = await pool.query(
    `
    UPDATE appointments a
    SET status = 'cancelled'
    FROM barbers b
    JOIN users bu ON bu.id = b.user_id
    WHERE a.barber_id = b.id
      AND bu.firebase_uid = $1
      AND b.is_active = true
      AND a.id = $2
      AND a.status = 'confirmed'
    RETURNING a.id, a.status
    `,
    [firebaseUid, appointmentId]
  );

  return result.rows[0] || null;
};


