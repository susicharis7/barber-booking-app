import type { Request, Response, NextFunction } from 'express';
import { firebaseAdminAuth } from '../firebase/firebase-admin';
import type { User } from '../types/types';
import { AppError } from '../core/errors/AppError';
import { ERROR_CODES } from '../core/errors/errorCodes';
import { logger } from '../core/logging/logger';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string | undefined;
    provider: string;
  };
  dbUser?: User;
}

export const verifyToken = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next(
        new AppError({
          status: 401,
          code: ERROR_CODES.UNAUTHORIZED,
          message: 'No token provided',
        })
      );
      return;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await firebaseAdminAuth.verifyIdToken(token, true);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      provider: decodedToken.firebase?.sign_in_provider ?? 'unknown',
    };

    next();
  } catch (error: any) {
    logger.warn('Token verification failed', {
      requestId: req.requestId,
      code: error?.code,
      message: error?.message,
    });

    if (error?.code === 'auth/id-token-revoked') {
      next(
        new AppError({
          status: 401,
          code: ERROR_CODES.TOKEN_REVOKED,
          message: 'Token is revoked',
        })
      );
      return;
    }

    if (error?.code === 'auth/user-disabled') {
      next(
        new AppError({
          status: 401,
          code: ERROR_CODES.USER_DISABLED,
          message: 'User account is disabled',
        })
      );
      return;
    }

    next(
      new AppError({
        status: 401,
        code: ERROR_CODES.UNAUTHORIZED,
        message: 'Invalid token',
      })
    );
  }
};
