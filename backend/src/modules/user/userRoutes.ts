import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as userController from './userController';
import { validateRequest } from '../../middleware/validateRequest';
import { registerUserValidation, updateMeValidation } from './userValidation';
import { registerLimiter } from '../../middleware/rateLimiters';
import { requireRegisteredUser } from '../../middleware/rbacMiddleware';



const router = Router();

router.post(
    '/register', 
    verifyToken,
    registerLimiter,
    registerUserValidation, 
    validateRequest, 
    userController.register
);

router.get(
    '/me',
    verifyToken, 
    requireRegisteredUser,
    userController.getMe);


router.put(
    '/me', 
    verifyToken, 
    requireRegisteredUser,
    updateMeValidation,
    validateRequest,
    userController.updateMe
); 

router.delete(
    '/me', 
    verifyToken, 
    requireRegisteredUser,
    userController.deleteMe

);

export default router;

