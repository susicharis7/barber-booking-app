import { Router } from 'express';
import * as barberController from './barberController';
import { validateRequest } from '../../middleware/validateRequest';
import { getBarberByIdValidation } from './barberValidation';

const router = Router();

router.get('/', barberController.getBarbers);

router.get(
    '/:id/working-hours',
    getBarberByIdValidation,
    validateRequest,
    barberController.getBarberWorkingHours
);

router.get(
    '/:id',
    getBarberByIdValidation,
    validateRequest,
    barberController.getBarber
);

export default router;
