import { Router } from 'express';
import * as servicesAndPriceListController from './servicesAndPriceListController';
import { validateRequest } from '../../middleware/validateRequest';
import { getServiceByIdValidation } from './servicesValidation';


const router = Router();

router.get('/', servicesAndPriceListController.getServices);
router.get(
    '/:id', 
    getServiceByIdValidation,
    validateRequest,
    servicesAndPriceListController.getService);

export default router;