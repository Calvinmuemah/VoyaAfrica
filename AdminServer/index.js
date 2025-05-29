import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './src/config/db.js';


// Routes
import authRoutes from './src/routes/auth.js';
// import routesRoutes from './src/routes/routes.js';
import driverRoutes from './src/routes/driverRoutes.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import routeRoutes from './src/routes/routeRoutes.js';
import dailyRoutes  from './src/routes/dailyRoutes.js';
import scheduleRoutes  from './src/routes/scheduleRoutes.js';
import DailyDepartureRoutes  from './src/routes/dailyDepartures.js';
import usersRoutes  from './src/routes/userRoutes.js';


// Middleware
import { errorHandler } from './src/middleware/errorHandler.js';
import { authenticateToken } from './src/middleware/auth.js';

// Load environment variables
dotenv.config();
connectDB();

// Create data directory if it doesn't exist
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Static folder for uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', driverRoutes);
app.use('/api', vehicleRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api', routeRoutes);
app.use('/api', dailyRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', DailyDepartureRoutes);
app.use('/api', usersRoutes);
// app.use('/api/routes', authenticateToken, routesRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;