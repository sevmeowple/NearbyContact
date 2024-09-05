import {Router} from 'express';
import {
    editProfileHandler,
    loginHandler,
    registerHandler,
    sendverifyEmailHandler,
    verifyEmailHandler
} from '../controllers/authController';
import {authenticateToken} from "../middleware/authMiddleware.ts";

const router = Router();

router.post('/login', authenticateToken, loginHandler);
router.post('/register', authenticateToken, registerHandler);
router.post('/editProfile', authenticateToken, editProfileHandler);

router.post('/verify', authenticateToken, sendverifyEmailHandler);
router.post('/verify/:token', authenticateToken, verifyEmailHandler);

export const authRoutes = router;