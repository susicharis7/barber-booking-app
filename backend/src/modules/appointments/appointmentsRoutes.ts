import { Router } from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import * as appointmentsController from './appointmentsController';

const router = Router();

// GET
router.get('/upcoming', verifyToken, appointmentsController.getUpcomingAppointments);
router.get('/past', verifyToken, appointmentsController.getPastAppointments);

// POST 
router.post('/', verifyToken, appointmentsController.createAppointment);


export default router;
