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

    const limit = Number(req.query.limit) || 5;
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
    const date = typeof req.query.date === 'string' ? req.query.date : undefined;

    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ message: 'date must be in YYYY-MM-DD format' });
      return;
    }

    const result = await staffService.getMyAppointments(user.uid, {
      limit,
      cursor,
      date,
    });

    res.json({
      appointments: result.appointments,
      nextCursor: result.nextCursor,
    });
  } catch (error) {
    console.error('Get my appointments error:', error);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

export const getMyAppointmentDays = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req as AuthRequest;

    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const from = typeof req.query.from === 'string' ? req.query.from : '';
    const to = typeof req.query.to === 'string' ? req.query.to : '';
    const isYmd = /^\d{4}-\d{2}-\d{2}$/;

    if (!isYmd.test(from) || !isYmd.test(to)) {
      res.status(400).json({ message: 'from and to must be in YYYY-MM-DD format' });
      return;
    }

    if (from > to) {
      res.status(400).json({ message: 'from must be before or equal to to' });
      return;
    }

    const days = await staffService.getMyAppointmentDays(user.uid, from, to);
    res.json({ days });
  } catch (error) {
    console.error('Get my appointment days error:', error);
    res.status(500).json({ message: 'Failed to fetch appointment days' });
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
