import { Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import * as userService from './userService';
import { firebaseAdminAuth } from '../../firebase/firebase-admin';

/* POST /api/users/register */
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
    
    try {
        const { first_name, last_name } = req.body;

        // Validation
        if (!first_name || !last_name) {
            res.status(400).json({ message: 'First name and last name are required. '});
            return; 
        }


        // Data from Verified Token
        const { uid, email } = req.user!;

        // Check does user already exists?
        const existingUser = await userService.findUserByFirebaseUID(uid);
        if (existingUser) { 
            res.status(409).json({ message: 'User Already Exists.' });
            return;
        }


        // Create User in DB
        const newUser = await userService.createUser({
            firebase_uid: uid,
            email: email || '',
            first_name,
            last_name,
        });

        console.log("New User Created: ", newUser);

        res.status(201).json({
            message: 'User Registered Successfully!',
            user: newUser,
        });

    } catch(error) {
        console.error('Registration Error: ', error);
        res.status(500).json({ message: 'Internal Server Error...'});
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


        if (!first_name || !last_name) {
            res.status(400).json({ message: 'First name & Last name are required.'});
            return;
        }

        const updatedUser = await userService.updateUser(uid, {
            first_name,
            last_name,
            phone: phone || null,
        });

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        console.log('User updated: ', updatedUser);

        res.json({ 
            message: 'Profile updated successfully.',
            user: updatedUser,
        });
        

    } catch(error) {
        console.error("Updated User Error: ", error);
        res.status(500).json({ message: 'Internal server error...'});
    }

}


/* DELETE api/users/me */
export const deleteMe = async (req: AuthRequest, res: Response): Promise<void> => {
    
    try {
        const { uid } = req.user!;


        // Delete from DB
        const deleted = await userService.deleteUser(uid);

        if (!deleted) {
            res.status(404).json({ message: 'User not found...'});
            return;
        }

        // Delete from Firebase
        await firebaseAdminAuth.deleteUser(uid);
        console.log("Deleted User: ", uid);
        res.json({ message: 'Account deleted successfully!'});
    } catch (error) {
        console.error("Delete user error: ", error);
        res.status(500).json({ message: 'Failed to delete account.'});
    }

}