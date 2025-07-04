// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import reviewRoutes from './review.routes';
import chatbotRoutes from './chatbot.routes';
import adminRoutes from './admin.routes';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', protect, userRoutes);
router.use('/products', productRoutes);
router.use('/cart', protect, cartRoutes);
router.use('/orders', protect, orderRoutes);
router.use('/reviews', reviewRoutes);
router.use('/chatbot', protect, chatbotRoutes);
router.use('/admin', protect, authorize(Role.ADMIN), adminRoutes);

export default router;