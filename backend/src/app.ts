import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './modules/user/userRoutes';
import barberRoutes from './modules/barber/barberRoutes';
import servicesAndPriceListRoutes from './modules/servicesAndPriceList/servicesAndPriceListRoutes';
import appointmentsRoutes from './modules/appointments/appointmentsRoutes';
import waitingListRoutes from './modules/waitingList/waitingListRoutes';
import staffRoutes from './modules/staff/staffRoutes';
import adminRoutes from './modules/admin/adminRoutes';

import { apiLimiter } from './middleware/rateLimiters';
import { requestIdMiddleware } from './middleware/requestIdMiddleware';
import { notFoundHandler, errorHandler } from './core/errors/errorHandler';
import { AppError } from './core/errors/AppError';
import { ERROR_CODES } from './core/errors/errorCodes';
import { sendSuccess } from './core/response/apiResponse';

const app = express();

app.set('trust proxy', 1);
app.use(requestIdMiddleware);
app.use(helmet());

const allowedOrigins = (process.env.FRONTEND_URLS || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(
        new AppError({
          status: 403,
          code: ERROR_CODES.FORBIDDEN,
          message: 'Not allowed by CORS',
        })
      );
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
    credentials: false,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

app.get('/health', (_req, res) => {
  sendSuccess(res, { status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/servicesAndPriceListRoutes', servicesAndPriceListRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/waiting-list', waitingListRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/admin', adminRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
