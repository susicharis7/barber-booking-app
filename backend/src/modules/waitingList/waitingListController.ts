import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import * as waitingListService from './waitingListService';

export const getWaitingList = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const list = await waitingListService.getWaitingListByUid(user.uid);
    res.json({ waitingList: list });
  } catch (error) {
    console.error('Get waiting list error:', error);
    res.status(500).json({ message: 'Failed to fetch waiting list' });
  }
};




export const createWaitingList = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { barber_id, service_id, start_date, end_date } = req.body;

    if (!barber_id || !start_date) {
      res.status(400).json({ message: 'barber_id and start_date are required' });
      return;
    }

    if (end_date && new Date(end_date) < new Date(start_date)) {
      res.status(400).json({ message: 'end_date must be >= start_date' });
      return;
    }

    const created = await waitingListService.createWaitingListByUid(user.uid, {
      barber_id,
      service_id,
      start_date,
      end_date,
    });

    if (!created) {
      res.status(409).json({ message: 'Waiting list already exists for this range' });
      return;
    }

    res.status(201).json({ waitingList: created });
  } catch (error) {
    console.error('Create waiting list error:', error);
    res.status(500).json({ message: 'Failed to create waiting list' });
  }
};
