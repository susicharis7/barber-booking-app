import { pool } from '../../db/pool';
import { StaffDashboardOverview } from '../../types/types';

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

export const getMyAppointments = async (firebaseUid: string, limit = 20) => {
  const safeLimit = Math.min(Math.max(limit, 1), 200);

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
    ORDER BY a.date DESC, a.start_time DESC, a.id DESC
    LIMIT $2
    `,
    [firebaseUid, safeLimit]
  );

  return result.rows;
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
      AND a.id = $2
      AND a.status = 'confirmed'
    RETURNING a.id, a.status
    `,
    [firebaseUid, appointmentId]
  );

  return result.rows[0] || null;
};


