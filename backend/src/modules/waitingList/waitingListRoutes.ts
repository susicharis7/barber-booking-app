import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as waitingListController from './waitingListController';
import { validateRequest } from '../../middleware/validateRequest';
import { cancelWaitingListValidation, createWaitingListValidation } from './waitingListValidation';


const router = Router();

router.get('/', verifyToken, waitingListController.getWaitingList);

router.post(
    '/', 
    verifyToken, 
    createWaitingListValidation,
    validateRequest,
    waitingListController.createWaitingList
);

router.put(
    '/:id/cancel', 
    verifyToken, 
    cancelWaitingListValidation,
    validateRequest,
    waitingListController.cancelWaitingList
);

export default router;
