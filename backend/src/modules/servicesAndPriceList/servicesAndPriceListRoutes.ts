import { Router } from 'express';
import * as servicesAndPriceListController from './servicesAndPriceListController';

const router = Router();

router.get('/', servicesAndPriceListController.getServices);
router.get('/:id', servicesAndPriceListController.getService);

export default router;