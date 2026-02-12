import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import { requireRegisteredUser } from '../../middleware/rbacMiddleware';
import * as waitingListController from './waitingListController';
import { validateRequest } from '../../middleware/validateRequest';
import {
  cancelWaitingListValidation,
  createWaitingListValidation,
} from './waitingListValidation';
import { createWaitingListLimiter } from '../../middleware/rateLimiters';

const router = Router();

router.get(
  '/',
  verifyToken,
  requireRegisteredUser,
  waitingListController.getWaitingList
);

router.post(
  '/',
  verifyToken,
  requireRegisteredUser,
  createWaitingListLimiter,
  createWaitingListValidation,
  validateRequest,
  waitingListController.createWaitingList
);

router.put(
  '/:id/cancel',
  verifyToken,
  requireRegisteredUser,
  cancelWaitingListValidation,
  validateRequest,
  waitingListController.cancelWaitingList
);

export default router;
