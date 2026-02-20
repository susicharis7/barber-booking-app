import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendError } from '../core/response/apiResponse';
import { ERROR_CODES } from '../core/errors/errorCodes';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    sendError(res, 400, {
      code: ERROR_CODES.VALIDATION_FAILED,
      message: 'Validation failed',
      details: errors.array(),
    });
    return;
  }

  next();
};
