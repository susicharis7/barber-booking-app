import { pool } from '../../db/pool';

export const getAllActiveBarbers = async () => {
    const result = await pool.query(
        `
        SELECT
        b.id,
        b.title,
        b.bio,
        b.avatar_url,
        u.first_name,
        u.last_name,
        u.email
        FROM barbers b
        JOIN users u ON b.user_id = u.id
        WHERE b.is_active = true
        ORDER BY b.id
        `
    );

    return result.rows;
};

export const getBarberById = async (id: number) => {
    const result = await pool.query(
        `
        SELECT 
        b.id,
        b.title,
        b.bio,
        b.avatar_url,
        u.first_name,
        u.last_name,
        u.email
        FROM barbers b
        JOIN users u ON b.user_id = u.id
        WHERE b.id = $1 AND b.is_active = true
        LIMIT 1
        `,
        [id]
    );

    return result.rows[0] || null;
};

export const getWorkingHoursByBarberId = async (barberId: number) => {
    const result = await pool.query(
        `
        SELECT
          id,
          barber_id,
          day_of_week,
          start_time,
          end_time,
          is_working
        FROM working_hours
        WHERE barber_id = $1
        ORDER BY day_of_week ASC
        `,
        [barberId]
    );

    return result.rows;
};
