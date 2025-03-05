import express from 'express';
import morgan from 'morgan';
import adminRoutes from '../src/api/v1/routes/adminRoute';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/admin', adminRoutes);

export default app;
