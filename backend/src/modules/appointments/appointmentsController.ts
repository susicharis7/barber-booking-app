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

export const createAppointment = async(req: Request, res: Response) => {

    try {
        const { user } = req as AuthRequest;
        if (!user?.uid) {
            res.status(401).json({ message: 'Unauthorized user!'});
            return;
        }

        const { barber_id , service_id, date, start_time, note} = req.body;

        const appointment = await appointmentsService.createAppointmentByUid(
            user.uid, { barber_id, service_id, date, start_time, note}
        );

        if (!appointment) {
            res.status(400).json({ message: 'Time slot is not available'});
            return;
        }

        res.status(201).json({ appointment });
    } catch(error) {
        console.error("Create Appointment error: ", error);
        res.status(500).json({ message: 'Failed to create an appointment...'});
    }

}

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized user!' });
      return;
    }

    const appointmentId = Number(req.params.id);
    if (!appointmentId) {
      res.status(400).json({ message: 'Invalid appointment id' });
      return;
    }

    const cancelled = await appointmentsService.cancelAppointmentByUid(
      user.uid,
      appointmentId
    );

    if (!cancelled) {
      res.status(404).json({ message: 'Appointment not found or not cancellable' });
      return;
    }

    res.json({ appointment: cancelled });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: 'Failed to cancel appointment' });
  }
};

export const getBookedTimes = async (req: Request, res: Response) => {
  try {
    const barberId = Number(req.params.barberId);
    const date = String(req.query.date || '');

    if (!barberId || !date) {
      res.status(400).json({ message: 'barberId and date are required' });
      return;
    }

    const slots = await appointmentsService.getBookedTimesForBarber(barberId, date);
    res.json({ slots });
  } catch (error) {
    console.error('Get booked times error:', error);
    res.status(500).json({ message: 'Failed to fetch booked times' });
  }
};


