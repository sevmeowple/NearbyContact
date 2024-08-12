import {Router} from 'express';
import {closeEventHandler, createEventHandler, reOpenEventHandler} from '../controllers/eventController';

const router = Router();

router.post('/create', createEventHandler);
router.post('/close/:eventId', closeEventHandler);
router.post('/reopen/:eventID', reOpenEventHandler);

export const eventRoutes = router;