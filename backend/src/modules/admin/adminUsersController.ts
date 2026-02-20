import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../../types/types';
import type { AuthRequest } from '../../middleware/authMiddleware';
import { AppError } from '../../core/errors/AppError';
import { ERROR_CODES } from '../../core/errors/errorCodes';
import { sendSuccess } from '../../core/response/apiResponse';
import * as adminUsersService from './adminUsersService';
import type { AppointmentStatus } from '../../types/adminUsers-types';


const parseBooleanQuery = (value: unknown): boolean | undefined => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return undefined;
};

const handleControllerError = (
  error: unknown,
  next: NextFunction,
  fallbackMessage: string
): void => {
  if (error instanceof AppError) {
    next(error);
    return;
  }

  next(
    new AppError({
      status: 500,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: fallbackMessage,
    })
  );
};

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : undefined;
    const role = typeof req.query.role === 'string' ? (req.query.role as UserRole) : undefined;
    const blocked = parseBooleanQuery(req.query.blocked);

    const result = await adminUsersService.listAdminUsers({
      page,
      limit,
      search,
      role,
      blocked,
    });

    sendSuccess(res, { users: result.users }, 200, { pagination: result.pagination });
  } catch (error) {
    handleControllerError(error, next, 'Failed to list users');
  }
};

export const updateUserRole = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const actorUserId = req.dbUser?.id;
    if (!actorUserId) {
      next(
        new AppError({
          status: 401,
          code: ERROR_CODES.UNAUTHORIZED,
          message: 'Unauthorized',
        })
      );
      return;
    }

    const userId = Number(req.params.userId);
    const nextRole = req.body.role as UserRole;

    const targetUser = await adminUsersService.getAdminUserById(userId);
    if (!targetUser) {
      next(
        new AppError({
          status: 404,
          code: ERROR_CODES.NOT_FOUND,
          message: 'User not found',
        })
      );
      return;
    }

    if (targetUser.role === nextRole) {
      sendSuccess(res, { user: targetUser });
      return;
    }

    if (actorUserId === targetUser.id && nextRole !== 'admin') {
      next(
        new AppError({
          status: 400,
          code: ERROR_CODES.BAD_REQUEST,
          message: 'You cannot remove your own admin role',
        })
      );
      return;
    }

    if (targetUser.role === 'admin' && nextRole !== 'admin' && !targetUser.is_blocked) {
      const activeAdmins = await adminUsersService.countActiveAdmins();
      if (activeAdmins <= 1) {
        next(
          new AppError({
            status: 400,
            code: ERROR_CODES.BAD_REQUEST,
            message: 'Cannot demote the last active admin',
          })
        );
        return;
      }
    }

    const updatedUser = await adminUsersService.updateAdminUserRole(userId, nextRole);

    if (!updatedUser) {
      next(
        new AppError({
          status: 404,
          code: ERROR_CODES.NOT_FOUND,
          message: 'User not found',
        })
      );
      return;
    }

    sendSuccess(res, { user: updatedUser });
  } catch (error) {
    handleControllerError(error, next, 'Failed to update user role');
  }
};

export const updateUserBlocked = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const actorUserId = req.dbUser?.id;
    if (!actorUserId) {
      next(
        new AppError({
          status: 401,
          code: ERROR_CODES.UNAUTHORIZED,
          message: 'Unauthorized',
        })
      );
      return;
    }

    const userId = Number(req.params.userId);
    const isBlocked = Boolean(req.body.is_blocked);

    const targetUser = await adminUsersService.getAdminUserById(userId);
    if (!targetUser) {
      next(
        new AppError({
          status: 404,
          code: ERROR_CODES.NOT_FOUND,
          message: 'User not found',
        })
      );
      return;
    }

    if (targetUser.is_blocked === isBlocked) {
      sendSuccess(res, { user: targetUser });
      return;
    }

    if (actorUserId === targetUser.id && isBlocked) {
      next(
        new AppError({
          status: 400,
          code: ERROR_CODES.BAD_REQUEST,
          message: 'You cannot block your own account',
        })
      );
      return;
    }

    if (targetUser.role === 'admin' && isBlocked && !targetUser.is_blocked) {
      const activeAdmins = await adminUsersService.countActiveAdmins();
      if (activeAdmins <= 1) {
        next(
          new AppError({
            status: 400,
            code: ERROR_CODES.BAD_REQUEST,
            message: 'Cannot block the last active admin',
          })
        );
        return;
      }
    }

    const updatedUser = await adminUsersService.setAdminUserBlocked(userId, isBlocked);

    if (!updatedUser) {
      next(
        new AppError({
          status: 404,
          code: ERROR_CODES.NOT_FOUND,
          message: 'User not found',
        })
      );
      return;
    }

    sendSuccess(res, { user: updatedUser });
  } catch (error) {
    handleControllerError(error, next, 'Failed to update user blocked status');
  }
};

export const getUserAppointmentsHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;

    const user = await adminUsersService.getAdminUserById(userId);
    if (!user) {
      next(
        new AppError({
          status: 404,
          code: ERROR_CODES.NOT_FOUND,
          message: 'User not found',
        })
      );
      return;
    }

    const result = await adminUsersService.listAdminUserAppointments({
      userId,
      page,
      limit,
      status: status as AppointmentStatus | undefined,

    });

    sendSuccess(res, { appointments: result.appointments }, 200, {
      pagination: result.pagination,
    });
  } catch (error) {
    handleControllerError(error, next, 'Failed to fetch user appointment history');
  }
};
