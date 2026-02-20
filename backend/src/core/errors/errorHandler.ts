import type { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import { ERROR_CODES } from './errorCodes';
import { sendError } from '../response/apiResponse';
import { logger } from '../logging/logger';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(
    new AppError({
      status: 404,
      code: ERROR_CODES.NOT_FOUND,
      message: `Route ${req.method} ${req.originalUrl} not found`,
    })
  );
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const isProd = process.env.NODE_ENV === 'production';

  let appError: AppError;

  if (err instanceof AppError) {
    appError = err;
  } else {
    appError = new AppError({
      status: 500,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      details: isProd ? undefined : err,
      expose: false,
    });
  }

  logger.error('Request failed', {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    status: appError.status,
    code: appError.code,
    error: isProd ? undefined : String((err as Error)?.stack ?? err),
  });

  sendError(res, appError.status, {
    code: String(appError.code),
    message: appError.message,
    details: appError.expose ? appError.details : undefined,
  });
};
