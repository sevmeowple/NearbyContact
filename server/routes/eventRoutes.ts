import {Router} from 'express';
import {
    changeEventStatusHandler,
    createEventHandler,
    editEventHandler,
    getAllOpenEventHandler,
} from '../controllers/eventController';
import {authenticateToken} from "../middleware/authMiddleware.ts";

const router = Router();

router.post('/create', authenticateToken, createEventHandler);
router.post('/edit', authenticateToken, editEventHandler);
router.post('/changeStatus', authenticateToken, changeEventStatusHandler);
router.post('/getAllOpen', getAllOpenEventHandler);

export const eventRoutes = router;