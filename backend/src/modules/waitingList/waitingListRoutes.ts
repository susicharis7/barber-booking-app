import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as waitingListController from './waitingListController';

const router = Router();

router.get('/', verifyToken, waitingListController.getWaitingList);
router.post('/', verifyToken, waitingListController.createWaitingList);
router.put('/:id/cancel', verifyToken, waitingListController.cancelWaitingList);

export default router;
