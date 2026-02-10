import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as userController from './userController';
import { validateRequest } from '../../middleware/validateRequest';
import { registerUserValidation, updateMeValidation } from './userValidation';
import { registerLimiter } from '../../middleware/rateLimiters';
import { requireRegisteredUser } from '../../middleware/rbacMiddleware';



const router = Router();

// Registration (Needs to have Firebase Token)
router.post(
    '/register', 
    verifyToken,
    registerLimiter,
    registerUserValidation, 
    validateRequest, 
    userController.register
);

// Fetch Current User (Also needs Firebase Token)
router.get(
    '/me',
    verifyToken, 
    requireRegisteredUser,
    userController.getMe);

// Update Current User
router.put(
    '/me', 
    verifyToken, 
    requireRegisteredUser,
    updateMeValidation,
    validateRequest,
    userController.updateMe
); 

// Delete Current User
router.delete('/me', verifyToken, userController.deleteMe);

export default router;

