import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../core/errors/AppError';
import { ERROR_CODES } from '../../core/errors/errorCodes';
import { sendSuccess } from '../../core/response/apiResponse';
import * as adminService from './adminService';

export const getOverview = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const overview = await adminService.getAdminOverview();
    sendSuccess(res, { overview });
  } catch (error) {
    next(
      new AppError({
        status: 500,
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch Admin Overview',
      })
    );
  }
};
