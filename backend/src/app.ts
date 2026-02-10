import express from 'express';
import cors from 'cors';
import userRoutes from './modules/user/userRoutes';
import barberRoutes from './modules/barber/barberRoutes';
import servicesAndPriceListRoutes from './modules/servicesAndPriceList/servicesAndPriceListRoutes';
import appointmentsRoutes from './modules/appointments/appointmentsRoutes';
import waitingListRoutes from './modules/waitingList/waitingListRoutes';
import { apiLimiter } from './middleware/rateLimiters';
import helmet from 'helmet';

import staffRoutes from './modules/staff/staffRoutes';


const app = express();
app.use(helmet());


/* Middleware Configuration */
const allowedOrigins = (process.env.FRONTEND_URLS || 'https://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

app.use(
    cors({ 
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // mobile, postman
            if (allowedOrigins.includes(origin)) return callback(null,true);
            return callback(new Error('Not allowed by CORS'));
        },

        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,  // true only if we use cookie auth
    })
)

app.use(express.json());
app.use(express.urlencoded( { extended: false }));

/* Health Check Route */
app.get('/health', (req, res) => {
    res.json ({ status: 'OK' , timestamp: new Date().toISOString() });
});

app.use('/api', apiLimiter);

/* API Routes */
app.use('/api/users', userRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/servicesAndPriceListRoutes', servicesAndPriceListRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/waiting-list', waitingListRoutes);
app.use('/api/staff', staffRoutes);


export default app;

