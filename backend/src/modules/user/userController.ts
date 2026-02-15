import { Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import * as userService from './userService';
import { firebaseAdminAuth } from '../../firebase/firebase-admin';
import { pool } from '../../db/pool';


/* POST /api/users/register */
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
    
    try {
        const { first_name, last_name } = req.body;
        const { uid, email } = req.user!;

        const normalizedEmail = (email ?? '').trim().toLowerCase();

        if (!normalizedEmail) {
            res.status(400).json({
                code: 'EMAIL_REQUIRED',
                message: 'Authenticated Firebase user must have a valid email',
            });
            return ;
        }

        // Check does user already exists?
        const existingUser = await userService.findUserByFirebaseUID(uid);
        if (existingUser) { 
            res.status(409).json({ code: 'USER_ALREADY_EXISTS', message: 'User already exists' });
            return;
        }

        const existingEmailUser = await userService.findUserByEmail(normalizedEmail);
        if (existingEmailUser && existingEmailUser.firebase_uid !== uid) {
            res.status(409).json({
                code: 'EMAIL_ALREADY_IN_USE',
                message: 'Email is already associated with another account',
            });
            return;
        }


        // Create User in DB
        const newUser = await userService.createUser({
            firebase_uid: uid,
            email: normalizedEmail,
            first_name,
            last_name,
        });

        console.log("New User Created: ", newUser);

        res.status(201).json({
            message: 'User Registered Successfully!',
            user: newUser,
        });

    } catch(error: any) {
        if (error?.code === '23505') {
            res.status(409).json({
                code: 'USER_ALREADY_EXISTS',
                message: 'User already exists',
            });
            return;
        }

        console.error('Registration Error: ', error);
        res.status(500).json({ message: 'Internal Server Error...' });
    }

};

/* GET api/users/me */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    
    try {
        const { uid } = req.user!;

        const user = await userService.findUserByFirebaseUID(uid);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json({ user });

    } catch(error) {
        console.error('Get User ERROR: ', error);
        res.status(500).json({ message: 'Internal Server Error (User)...'});
    }

};


/* PUT api/users/me */
export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, phone } = req.body;
    const { uid } = req.user!;

    const payload: { first_name?: string; last_name?: string; phone?: string | null } = {};

    if (first_name !== undefined) payload.first_name = first_name;
    if (last_name !== undefined) payload.last_name = last_name;
    if (phone !== undefined) payload.phone = phone || null;

    if (Object.keys(payload).length === 0) {
      res.status(400).json({
        code: 'NO_FIELDS_TO_UPDATE',
        message: 'No fields provided for update',
      });
      return;
    }

    const updatedUser = await userService.updateUser(uid, payload);

    if (!updatedUser) {
      res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
      return;
    }

    res.json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Updated User Error:', error);
    res.status(500).json({ message: 'Internal server error...' });
  }
};



/* DELETE api/users/me */
export const deleteMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const uid = req.user?.uid;

  if (!uid) {
    res.status(401).json({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const deleted = await userService.deleteUser(uid, client);
    if (!deleted) {
      await client.query('ROLLBACK');
      res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
      return;
    }

    try {
      await firebaseAdminAuth.deleteUser(uid);
    } catch (error: any) {
      if (error?.code !== 'auth/user-not-found') {
        await client.query('ROLLBACK');
        console.error('Firebase delete user error:', error);
        res.status(502).json({
          code: 'FIREBASE_DELETE_FAILED',
          message: 'Failed to delete Firebase account',
        });
        return;
      }
    }

    await client.query('COMMIT');
    res.json({ message: 'Account deleted successfully!' });
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
        
    }

    console.error('Delete user error:', error);
    res.status(500).json({ code: 'DELETE_FAILED', message: 'Failed to delete account.' });
  } finally {
    client.release();
  }
};