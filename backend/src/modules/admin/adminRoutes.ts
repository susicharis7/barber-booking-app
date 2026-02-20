import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import { requireAdmin, requireRegisteredUser } from '../../middleware/rbacMiddleware';
import { adminReadLimiter, adminWriteLimiter } from '../../middleware/rateLimiters';
import { validateRequest } from '../../middleware/validateRequest';
import * as adminController from './adminController';
import * as adminUsersController from './adminUsersController';
import {
  getAdminUserAppointmentsHistoryValidation,
  listAdminUsersValidation,
  updateAdminUserBlockedValidation,
  updateAdminUserRoleValidation,
} from './adminUsersValidation';

const router = Router();

router.use(
    verifyToken, 
    requireRegisteredUser, 
    requireAdmin
);

router.get(
    '/overview', 
    adminReadLimiter, 
    adminController.getOverview
);

router.get(
    '/users',
    adminReadLimiter,
    listAdminUsersValidation,
    validateRequest,
    adminUsersController.listUsers
);

router.patch(
    '/users/:userId/role',
    adminWriteLimiter,
    updateAdminUserRoleValidation,
    validateRequest,
    adminUsersController.updateUserRole
);

router.patch(
    '/users/:userId/blocked',
    adminWriteLimiter,
    updateAdminUserBlockedValidation,
    validateRequest,
    adminUsersController.updateUserBlocked
);

router.get(
  '/users/:userId/appointments',
  adminReadLimiter,
  getAdminUserAppointmentsHistoryValidation,
  validateRequest,
  adminUsersController.getUserAppointmentsHistory
);
export default router;
