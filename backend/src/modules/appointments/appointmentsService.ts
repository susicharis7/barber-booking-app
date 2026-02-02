import { pool } from '../../db/pool';

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
      AND a.status IN ('pending', 'confirmed')
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
