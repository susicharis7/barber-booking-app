import type { Request } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import type { AuthRequest } from './authMiddleware';
import { ERROR_CODES } from '../core/errors/errorCodes';

const baseLimiterConfig = {
  standardHeaders: 'draft-7' as const,
  legacyHeaders: false,
  skip: (req: any) => req.method === 'OPTIONS',
};

const uidOrIpKey = (req: Request): string => {
  const authReq = req as AuthRequest;
  return authReq.user?.uid ?? (req.ip ? ipKeyGenerator(req.ip): 'unknown');
}

export const apiLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 15 * 60 * 1000, // 15 min
  max: 2000,
  message: {
    code: ERROR_CODES.RATE_LIMITED,
    message: 'Too many requests from this IP. Please try again later.',
  },
});

export const createAppointmentLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 60 * 60 * 1000, // 1h
  max: 5,
  keyGenerator: uidOrIpKey,
  message: {
    code: 'APPOINTMENT_RATE_LIMITED',
    message: 'Too many appointment creation attempts. Please try again later.',
  },
});

export const createWaitingListLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 60 * 60 * 1000, 
  max: 5,
  keyGenerator: uidOrIpKey,
  message: {
    code: 'WAITING_LIST_RATE_LIMITED',
    message: 'Too many waiting list requests. Please try again later.',
  },
});

export const registerLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 15 * 60 * 1000, 
  max: 50,
  keyGenerator: uidOrIpKey,
  message: {
    code: 'REGISTER_RATE_LIMITED',
    message: 'Too many registration attempts. Please try again later.',
  },
});

export const adminReadLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 15 * 60 * 1000, 
  max: 600,
  keyGenerator: uidOrIpKey,
  message: {
    code: ERROR_CODES.RATE_LIMITED,
    message: 'Too many Admin read requests. Please try again later.',
  },
});

export const adminWriteLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 15 * 60 * 1000, 
  max: 120,
  keyGenerator: uidOrIpKey,
  message: {
    code: ERROR_CODES.RATE_LIMITED,
    message: 'Too many Admin write requests. Please try again later.'
  }
});

