import {Router} from "express";
import {getImageHandler} from "../controllers/fileController.ts";

const router = Router();

router.post('/original', (req, res) => getImageHandler(req, res, 'original'));
router.post('/thumbnail', (req, res) => getImageHandler(req, res, 'thumbnail'));

export const fileRoutes = router;