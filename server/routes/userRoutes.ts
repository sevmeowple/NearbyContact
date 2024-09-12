import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getSpecificProfileHandler } from '../controllers/authController.ts';

const router = Router();

router.post('/user', authenticateToken, getSpecificProfileHandler);

export const userRoutes = router;