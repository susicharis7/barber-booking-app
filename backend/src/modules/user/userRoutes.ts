import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as userController from './userController';

const router = Router();

// Registration (Needs to have Firebase Token)
router.post('/register', verifyToken, userController.register);

// Fetch Current Usre (Also needs Firebase Token)
router.get('/me', verifyToken, userController.getMe);

export default router;

