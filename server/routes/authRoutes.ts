import {Router} from 'express';
import {editProfileHandler, loginHandler, registerHandler} from '../controllers/authController';
import {authenticateToken} from "../middleware/authMiddleware.ts";

const router = Router();

router.post('/login', authenticateToken, loginHandler);
router.post('/register', authenticateToken, registerHandler);
router.post('/editProfile', authenticateToken, editProfileHandler);

export const authRoutes = router;