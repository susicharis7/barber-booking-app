import { Router } from 'express';
import * as barberController from './barberController';

const router = Router();

router.get('/', barberController.getBarbers);
router.get('/:id', barberController.getBarber);

export default router;