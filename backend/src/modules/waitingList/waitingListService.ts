import { pool } from '../../db/pool';
import type { CreateWaitingListData } from '../../types/types';

export const getWaitingListByUid = async (firebaseUid: string) => {
  const result = await pool.query(
    `
    SELECT
      wl.id,
      wl.start_date,
      wl.end_date,
      wl.status,
      wl.created_at,
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
    FROM waiting_list wl
    JOIN users cu ON cu.id = wl.customer_id
    LEFT JOIN barbers b ON b.id = wl.barber_id
    LEFT JOIN users bu ON bu.id = b.user_id
    LEFT JOIN services s ON s.id = wl.service_id
    WHERE cu.firebase_uid = $1
      AND wl.status = 'active'
    ORDER BY wl.created_at DESC
    `,
    [firebaseUid]
  );

  return result.rows;
};





export const createWaitingListByUid = async (
  firebaseUid: string,
  data: CreateWaitingListData
) => {
  const { barber_id, service_id = null, start_date, end_date = null } = data;

  const overlap = await pool.query(
    `
    SELECT 1
    FROM waiting_list wl
    JOIN users u ON u.id = wl.customer_id
    WHERE u.firebase_uid = $1
      AND wl.barber_id = $2
      AND wl.status = 'active'
      AND $3::date <= COALESCE(wl.end_date, 'infinity'::date)
      AND COALESCE($4::date, 'infinity'::date) >= wl.start_date
    LIMIT 1
    `,
    [firebaseUid, barber_id, start_date, end_date]
  );

  if ((overlap.rowCount ?? 0) > 0) return null;

  const result = await pool.query(
    `
    WITH new_wait AS (
      INSERT INTO waiting_list (
        customer_id, barber_id, service_id, start_date, end_date, status
      )
      SELECT
        u.id,
        $2,
        $3,
        $4::date,
        $5::date,
        'active'
      FROM users u
      WHERE u.firebase_uid = $1
      RETURNING *
    )
    SELECT
      wl.id,
      wl.start_date,
      wl.end_date,
      wl.status,
      wl.created_at,
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
    FROM new_wait wl
    LEFT JOIN barbers b ON b.id = wl.barber_id
    LEFT JOIN users bu ON bu.id = b.user_id
    LEFT JOIN services s ON s.id = wl.service_id
    `,
    [firebaseUid, barber_id, service_id, start_date, end_date]
  );

  return result.rows[0] || null;
};



export const cancelWaitingListByUid = async (
  firebaseUid: string,
  waitingListId: number
) => {
  const result = await pool.query(`
    UPDATE waiting_list wl
    SET status = 'cancelled' 
    FROM users u 
    WHERE wl.customer_id = u.id
      AND u.firebase_uid = $1
      AND wl.id = $2 
      AND wl.status = 'active' 
    RETURNING wl.id, wl.status   
  `, [firebaseUid, waitingListId]);

  return result.rows[0] || null; 
};

