import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as appointmentsController from './appointmentsController';
import { createAppointmentLimiter } from '../../middleware/rateLimiters';


/* Server side protection */
import { validateRequest } from '../../middleware/validateRequest';
import { 
    createAppointmentValidation,
    cancelAppointmentValidation,
    getBookedTimesValidation,
    getAppointmentsValidation,
} from './appointmentsValidation';
import { requireRegisteredUser } from '../../middleware/rbacMiddleware';

const router = Router();

// GET
router.get(
    '/upcoming', 
    verifyToken, 
    requireRegisteredUser,
    getAppointmentsValidation,
    validateRequest,
    appointmentsController.getUpcomingAppointments
);

router.get(
    '/past', 
    verifyToken, 
    requireRegisteredUser,
    getAppointmentsValidation,
    validateRequest,    
    appointmentsController.getPastAppointments
);

router.get(
    '/barber/:barberId/booked', 
    verifyToken,
    requireRegisteredUser,
    getBookedTimesValidation,
    validateRequest,
    appointmentsController.getBookedTimes
);


// POST
router.post(
  '/',
  verifyToken,
  requireRegisteredUser,
  createAppointmentLimiter,
  createAppointmentValidation,
  validateRequest,
  appointmentsController.createAppointment
);

// UPDATE
router.put(
  '/:id/cancel',
  verifyToken,
  requireRegisteredUser,
  cancelAppointmentValidation,
  validateRequest,
  appointmentsController.cancelAppointment
);


export default router;
