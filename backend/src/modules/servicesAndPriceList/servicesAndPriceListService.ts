import { pool } from '../../db/pool';

export const getAllActiveServicesAndPriceList = async () => {
    const result = await pool.query(` 
        SELECT id, name, description, duration, price
        FROM services 
        WHERE is_active = true
        ORDER BY id
    `);

    return result.rows;
}


export const getServiceById = async (id: Number) => {
    const result = await pool.query(`
        SELECT id, name, description, duration, price
        FROM services
        WHERE id = $1 AND is_active = true
        `, [id]);


        return result.rows[0] || null;
}



