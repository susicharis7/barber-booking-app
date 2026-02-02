import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as appointmentsController from './appointmentsController';

const router = Router();

router.get('/upcoming', verifyToken, appointmentsController.getUpcomingAppointments);
router.get('/past', verifyToken, appointmentsController.getPastAppointments);

export default router;
