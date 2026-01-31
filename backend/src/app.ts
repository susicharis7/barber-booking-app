import express from 'express';
import cors from 'cors';
import userRoutes from './modules/user/userRoutes';
import barberRoutes from './modules/barber/barberRoutes';

const app = express();

/* Middleware Configuration */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

/* Health Check Route */
app.get('/health', (req, res) => {
    res.json ({ status: 'OK' , timestamp: new Date().toISOString() });
});

/* API Routes */
app.use('/api/users', userRoutes);
app.use('/api/barbers', barberRoutes);



export default app;

