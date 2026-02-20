import type { Response, NextFunction } from 'express';
import type { UserRole } from '../types/types';
import type { AuthRequest } from './authMiddleware';
import * as userService from '../modules/user/userService';
import { AppError } from '../core/errors/AppError';
import { ERROR_CODES } from '../core/errors/errorCodes';

export const requireRegisteredUser = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      next(
        new AppError({
          status: 401,
          code: ERROR_CODES.UNAUTHORIZED,
          message: 'Missing auth user',
        })
      );
      return;
    }

    const dbUser = await userService.findUserByFirebaseUID(uid);

    if (!dbUser) {
      next(
        new AppError({
          status: 403,
          code: ERROR_CODES.USER_NOT_REGISTERED,
          message: 'User must be registered in database',
        })
      );
      return;
    };

    if (dbUser.is_blocked) {
      next(
        new AppError({
          status: 403,
          code: ERROR_CODES.FORBIDDEN,
          message: 'User profile is blocked.',
        })
      );

      return;
    };

    req.dbUser = dbUser;
    next();
  } catch {
    next(
      new AppError({
        status: 500,
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      })
    );
  }
};

export const requireAnyRole =
  (...allowedRoles: UserRole[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction): void => {
    const role = req.dbUser?.role;

    if (!role) {
      next(
        new AppError({
          status: 403,
          code: ERROR_CODES.FORBIDDEN,
          message: 'Role missing',
        })
      );
      return;
    }

    if (!allowedRoles.includes(role)) {
      next(
        new AppError({
          status: 403,
          code: ERROR_CODES.FORBIDDEN,
          message: 'Insufficient role',
        })
      );
      return;
    }

    next();
  };

export const requireStaff = requireAnyRole('barber', 'admin');
export const requireAdmin = requireAnyRole('admin');
