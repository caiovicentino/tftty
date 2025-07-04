// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import apiRouter from './api/routes';
import { errorMiddleware } from './api/middlewares/error.middleware';
import { orderController } from './api/controllers/order.controller';

const app: Express = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Special route for Stripe webhook before express.json()
app.post('/api/v1/orders/webhook', express.raw({ type: 'application/json' }), orderController.handleStripeWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1', apiRouter);

// API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

// Not Found Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error Handling Middleware
app.use(errorMiddleware);

export default app;