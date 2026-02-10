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
