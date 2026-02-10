import { Request, Response } from 'express';
import * as staffService from './staffService';

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
