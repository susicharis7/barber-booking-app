import { pool } from '../../db/pool';
import type { CreateUserData, User } from '../../types/types';


export const createUser = async (userData: CreateUserData): Promise<User> => {
    const { firebase_uid, email, first_name, last_name } = userData;

    const result = await pool.query(
        `INSERT INTO users (firebase_uid, email, first_name, last_name)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [firebase_uid, email, first_name, last_name]
    );

    return result.rows[0];
};

export const updateUser = async (
  firebase_uid: string,
  data: { first_name?: string; last_name?: string; phone?: string | null }
): Promise<User | null> => {
  const updates: string[] = [];
  const values: Array<string | null> = [];
  let i = 1;

  if (data.first_name !== undefined) {
    updates.push(`first_name = $${i++}`);
    values.push(data.first_name);
  }

  if (data.last_name !== undefined) {
    updates.push(`last_name = $${i++}`);
    values.push(data.last_name);
  }

  if (data.phone !== undefined) {
    updates.push(`phone = $${i++}`);
    values.push(data.phone);
  }

  if (updates.length === 0) return null;

  values.push(firebase_uid);

  const result = await pool.query(
    `
    UPDATE users
    SET ${updates.join(', ')}
    WHERE firebase_uid = $${i}
    RETURNING *
    `,
    values
  );

  return result.rows[0] || null;
};


export const deleteUser = async(firebase_uid: string): Promise<boolean> => {
    const result = await pool.query(
        `DELETE FROM users WHERE firebase_uid = $1 RETURNING *`, 
        [firebase_uid]
    );

    return result.rowCount !== null && result.rowCount > 0;
}


export const findUserByFirebaseUID = async (firebase_uid: string): Promise<User | null> => {
    const result = await pool.query(
        `SELECT * FROM users WHERE firebase_uid = $1 LIMIT 1`,
        [firebase_uid]
    );

    return result.rows[0] || null;
}


export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1 LIMIT 1`,
        [email]
    );

    return result.rows[0] || null;
}