import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import type { AuthRequest } from './authMiddleware';

const baseLimiterConfig = {
  standardHeaders: 'draft-7' as const,
  legacyHeaders: false,
  skip: (req: any) => req.method === 'OPTIONS',
};

export const apiLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: {
    code: 'RATE_LIMITED',
    message: 'Too many requests from this IP. Please try again later.',
  },
});

export const createAppointmentLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs:60 * 60 * 1000, // 1h
  max: 5,
  keyGenerator: (req) => {
    const authReq = req as AuthRequest;
    return authReq.user?.uid ?? (req.ip ? ipKeyGenerator(req.ip) : 'unknown');
  },
  message: {
    code: 'APPOINTMENT_RATE_LIMITED',
    message: 'Too many appointment creation attempts. Please try again later.',
  },
});

export const createWaitingListLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 60 * 60 * 1000, // 1h
  max: 10,
  keyGenerator: (req) => {
    const authReq = req as AuthRequest;
    return authReq.user?.uid ?? (req.ip ? ipKeyGenerator(req.ip) : 'unknown');
  },
  message: {
    code: 'WAITING_LIST_RATE_LIMITED',
    message: 'Too many waiting list requests. Please try again later.',
  },
});

export const registerLimiter = rateLimit({
  ...baseLimiterConfig,
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  keyGenerator: (req) => {
    const authReq = req as AuthRequest;
    return authReq.user?.uid ?? (req.ip ? ipKeyGenerator(req.ip) : 'unknown');
  },
  message: {
    code: 'REGISTER_RATE_LIMITED',
    message: 'Too many registration attempts. Please try again later.',
  },
});
