import { Request, Response } from 'express';
import * as staffService from './staffService';
import { AuthRequest } from '../../middleware/authMiddleware';


export const getDashboardOverview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const overview = await staffService.getDashboardOverview();

    res.json({
      overview,
    });
  } catch (error) {
    console.error('Get staff dashboard overview error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard overview' });
  }
};

export const getMyAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req as AuthRequest;

    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const limit = Number(req.query.limit) || 20;
    const appointments = await staffService.getMyAppointments(user.uid, limit);

    res.json({ appointments });
  } catch (error) {
    console.error('Get my appointments error:', error);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

export const cancelMyAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req as AuthRequest;
    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const appointmentId = Number(req.params.id);
    if (!Number.isInteger(appointmentId) || appointmentId <= 0) {
      res.status(400).json({ code: 'INVALID_APPOINTMENT_ID', message: 'Invalid appointment id' });
      return;
    }

    const cancelled = await staffService.cancelMyAppointment(user.uid, appointmentId);

    if (!cancelled) {
      res.status(404).json({
        code: 'APPOINTMENT_NOT_FOUND_OR_NOT_CANCELLABLE',
        message: 'Appointment not found or not cancellable',
      });
      return;
    }

    res.json({ appointment: cancelled });
  } catch (error) {
    console.error('Cancel my appointment error:', error);
    res.status(500).json({ message: 'Failed to cancel appointment' });
  }
};
