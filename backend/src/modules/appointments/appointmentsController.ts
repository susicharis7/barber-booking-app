import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import * as appointmentsService from './appointmentsService';

export const getUpcomingAppointments = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const appointments = await appointmentsService.getUpcomingAppointments(
      user.uid
    );

    res.json({ appointments });
  } catch (error) {
    console.error('Get upcoming appointments error:', error);
    res.status(500).json({ message: 'Failed to fetch upcoming appointments' });
  }
};

export const getPastAppointments = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const appointments = await appointmentsService.getPastAppointments(
      user.uid
    );

    res.json({ appointments });
  } catch (error) {
    console.error('Get past appointments error:', error);
    res.status(500).json({ message: 'Failed to fetch past appointments' });
  }
};
