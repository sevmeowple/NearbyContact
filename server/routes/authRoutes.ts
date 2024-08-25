import {Router} from 'express';
import {loginHandler, registerHandler} from '../controllers/authController';

const router = Router();

router.post('/login', loginHandler);
router.post('/register', registerHandler);

export const authRoutes = router;