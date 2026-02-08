import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
import * as waitingListService from './waitingListService';
import { barberExists, serviceExists } from '../../db/repositoryUtils';


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

    const [barberOk, serviceOk] = await Promise.all([
      barberExists(barber_id),
      service_id ? serviceExists(service_id) : Promise.resolve(true),
    ]);

    if (!barberOk) {
      res.status(400).json({ message: 'Invalid barber_id' });
      return;
    }

    if (!serviceOk) {
      res.status(400).json({ message: 'Invalid service_id' });
      return;
    }



    const created = await waitingListService.createWaitingListByUid(user.uid, {
      barber_id,
      service_id,
      start_date,
      end_date,
    });

    if (!created) {
      res.status(409).json({ 
        code: 'WAITING_LIST_EXISTS',
        message: 'You already have an active waiting list request for this date range' 
      });
      return;
    }

    res.status(201).json({ waitingList: created });
  } catch (error) {
    console.error('Create waiting list error:', error);
    res.status(500).json({ message: 'Failed to create waiting list' });
  }
};




export const cancelWaitingList = async (req: Request, res: Response) => {

  try {

    const { user } = req as AuthRequest; 

    if (!user?.uid) {
      res.status(401).json({ message: 'Unauthorized '});
      return; 
    }


    const waitingListId = Number(req.params.id);
    

    const cancelled = await waitingListService.cancelWaitingListByUid(
      user.uid,
      waitingListId
    );

    if (!cancelled) {
      res.status(404).json({ 
        code: 'WAITING_LIST_NOT_FOUND',
        message: 'Waiting list request not found or already cancelled'
      });
      return;
    }

    res.json({ waitingList: cancelled });

  } catch(error) {
    console.error('Cancel waiting list error: ', error);
    res.status(500).json({ message: 'Failed to cancel waiting list'});
  }



}