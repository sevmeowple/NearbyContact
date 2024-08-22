import {Router} from 'express';
import {
    closeEventHandler,
    createEventHandler,
    reOpenEventHandler,
    takeEventHandler
} from '../controllers/eventController';
import {authenticateToken} from "../middleware/authMiddleware.ts";

const router = Router();

router.post('/create', authenticateToken, createEventHandler);
router.post('/take/:eventId', authenticateToken, takeEventHandler);
router.post('/close/:eventId', authenticateToken, closeEventHandler);
router.post('/reopen/:eventId', authenticateToken, reOpenEventHandler);

export const eventRoutes = router;