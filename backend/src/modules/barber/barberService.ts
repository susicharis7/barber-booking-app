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

export const getBarberById = async (id: Number) => {
    const result = await pool.query(`
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
        `, [id]);

        return result.rows[0] || null;
};




