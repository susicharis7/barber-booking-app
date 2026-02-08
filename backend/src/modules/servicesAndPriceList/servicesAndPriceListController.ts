import { Request, Response } from 'express';
import * as servicesAndPriceListService from './servicesAndPriceListService';

export const getServices = async (req: Request, res: Response): Promise<void> => {

    try {
        const services = await servicesAndPriceListService.getAllActiveServicesAndPriceList();
        res.json({ services });
    } catch (error) {
        console.log("Get Services & Price List Error: ", error);
        res.status(500).json({ message: 'Failed to fetch Services & Price List'});
    }

};


export const getService = async (req: Request, res: Response): Promise<void> => {

    try {
        const serviceId = Number(req.params.id);
        const service = await servicesAndPriceListService.getServiceById(serviceId);


        if (!service) {
            res.status(404).json({ code: 'SERVICE_NOT_FOUND', message: 'Service not found' });
            return;
        }

        res.json({ service });
    } catch(error) {
        console.error("Get Service (by ID) Error: ", error);
        res.status(500).json({ message: 'Cannot fetch service (by ID)'})
    }

};

