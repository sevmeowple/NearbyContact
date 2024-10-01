import { Router } from 'express';
import {
	changeEventStatusHandler,
	createEventHandler,
	editEventHandler,
	getSpecificEventHandler
} from '../controllers/eventController';

const router = Router();

router.post('/create', createEventHandler);
router.post('/edit', editEventHandler);
router.post('/changeStatus', changeEventStatusHandler);
router.get('/:eventId', getSpecificEventHandler);

export const eventRoutes = router;