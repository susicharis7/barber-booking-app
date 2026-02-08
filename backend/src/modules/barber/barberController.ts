import { Request, Response } from 'express';
import * as barberService from './barberService';

export const getBarbers = async (req: Request, res: Response): Promise<void> => {
  try {
    const barbers = await barberService.getAllActiveBarbers();
    res.json({ barbers });
  } catch (error) {
    console.error('Get barbers error:', error);
    res.status(500).json({ message: 'Failed to fetch barbers' });
  }
};

export const getBarber = async (req: Request, res: Response): Promise<void> => {
  try {
    const barberId = Number(req.params.id);
    const barber = await barberService.getBarberById(barberId);


    if (!barber) {
      res.status(404).json({ code: 'BARBER_NOT_FOUND', message: 'Barber not found' });
      return;
    }

    res.json({ barber });
  } catch (error) {
    console.error('Get barber error:', error);
    res.status(500).json({ message: 'Failed to fetch barber' });
  }
};