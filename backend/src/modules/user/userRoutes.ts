import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as userController from './userController';

const router = Router();

// Registration (Needs to have Firebase Token)
router.post('/register', verifyToken, userController.register);

// Fetch Current User (Also needs Firebase Token)
router.get('/me', verifyToken, userController.getMe);

// Update Current User
router.put('/me', verifyToken, userController.updateMe); 

// Delete Current User
router.delete('/me', verifyToken, userController.deleteMe);

export default router;

