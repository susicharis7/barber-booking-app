import { pool } from '../../db/pool';

export interface CreateUserData {
    firebase_uid: string; 
    email: string;
    first_name: string;
    last_name: string; 
}

export interface User {
    id: number;
    firebase_uid: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
}

/* Creates new User in Postgre */
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

/* Updates User in DB */
export const updateUser = async(
    firebase_uid: string,
    data: { first_name: string; last_name: string; phone: string | null}
) : Promise<User | null> => {
    const { first_name, last_name, phone } = data;

    const result = await pool.query(
        `UPDATE users
         SET first_name = $1, last_name = $2, phone = $3
         WHERE firebase_uid = $4
         RETURNING *`,
         [first_name, last_name, phone, firebase_uid]
    );

    return result.rows[0] || null;
}

/* Finds user by Firebase UID */
export const findUserByFirebaseUID = async (firebase_uid: string): Promise<User | null> => {
    const result = await pool.query(
        `SELECT * FROM users WHERE firebase_uid = $1`,
        [firebase_uid]
    );

    return result.rows[0] || null;
}

/* Finds user by EMAIL */
export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0] || null;
}