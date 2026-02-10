import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import { requireRegisteredUser, requireStaff } from '../../middleware/rbacMiddleware';
import * as staffController from './staffController';

const router = Router();

router.get(
  '/dashboard/overview',
  verifyToken,
  requireRegisteredUser,
  requireStaff,
  staffController.getDashboardOverview
);

export default router;
