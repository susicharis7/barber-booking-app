import { Response, NextFunction } from 'express';
import type { UserRole } from '../types/types';
import type { AuthRequest } from './authMiddleware';
import * as userService from '../modules/user/userService';

export const requireRegisteredUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ code: 'UNAUTHORIZED', message: 'Missing AUTH User' });
      return;
    }

    const dbUser = await userService.findUserByFirebaseUID(uid);

    if (!dbUser) {
      res.status(403).json({
        code: 'USER_NOT_REGISTERED',
        message: 'User must be registered in database',
      });
      return;
    }

    req.dbUser = dbUser;
    next();

  } catch (error) {
    console.error('requireRegisteredUser error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }



};

export const requireAnyRole = 
  (...allowedRoles: UserRole[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    const role = req.dbUser?.role;

    if (!role) {
      res.status(403).json({ code: 'FORBIDDEN', message: 'Role missing' });
      return;
    }

    if (!allowedRoles.includes(role)) {
      res.status(403).json({ code: 'FORBIDDEN', message: 'Insufficient role' });
      return;
    }

    next();
  };

export const requireStaff = requireAnyRole('barber', 'admin');
