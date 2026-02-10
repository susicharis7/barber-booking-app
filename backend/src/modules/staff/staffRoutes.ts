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

router.get(
  '/me/appointments',
  verifyToken,
  requireRegisteredUser,
  requireStaff,
  staffController.getMyAppointments
);

router.put(
  '/appointments/:id/cancel',
  verifyToken,
  requireRegisteredUser,
  requireStaff,
  staffController.cancelMyAppointment
);


export default router;
