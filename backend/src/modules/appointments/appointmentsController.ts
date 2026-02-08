import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import * as appointmentsService from './appointmentsService';
import { toLocalYmd } from './helperFunctions';
import { barberExists, serviceExists } from '../../db/repositoryUtils';

export const getUpcomingAppointments = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;

    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const limit = Number(req.query.limit) || 5;
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;

    const result = await appointmentsService.getUpcomingAppointments(
      user.uid, 
      limit,
      cursor
    )

   

    res.json({ 
      appointments: result.appointments,
      nextCursor: result.nextCursor,
     });
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

    const limit = Number(req.query.limit) || 5;
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;

    const result = await appointmentsService.getPastAppointments(
      user.uid,
      limit,
      cursor
    );

    res.json({
      appointments: result.appointments,
      nextCursor: result.nextCursor,
    });
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

        const [barberOk, serviceOk] = await Promise.all([
          barberExists(barber_id),
          serviceExists(service_id),
        ]);

        if (!barberOk) {
          res.status(400).json({ message: 'Invalid barber_id' });
          return;
        }

        if (!serviceOk) {
          res.status(400).json({ message: 'Invalid service_id' });
          return;
        }


        /* Prevent POST for appointments in the past */
        const now = new Date();
        const todayLocal = toLocalYmd(now);

        if (date < todayLocal) {
          res.status(409).json({ message: 'Date is in the past.'});
          return;
        }



        if (date === todayLocal) {
          const [h,m] = String(start_time).split(':').map(Number);
          const slotTime = new Date(now);
          slotTime.setHours(h, m, 0, 0);

          if (slotTime <= now) {
            res.status(409).json({message: "Time slot is in the past"});
            return;
          }
        }

        const appointment = await appointmentsService.createAppointmentByUid(
            user.uid, { barber_id, service_id, date, start_time, note}
        );

        if (!appointment) {
            res.status(409).json({ message: 'Time slot is not available'});
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
    const date = String(req.query.date);


    const slots = await appointmentsService.getBookedTimesForBarber(barberId, date);
    res.json({ slots });
  } catch (error) {
    console.error('Get booked times error:', error);
    res.status(500).json({ message: 'Failed to fetch booked times' });
  }
};


