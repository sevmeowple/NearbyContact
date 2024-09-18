import { Router } from 'express';
import { getImageHandler } from '../controllers/fileController.ts';

const router = Router();

router.get('/original/:imageId', (req, res) => getImageHandler(req, res, 'original'));
router.get('/thumbnail/:imageId', (req, res) => getImageHandler(req, res, 'thumbnail'));

export const fileRoutes = router;