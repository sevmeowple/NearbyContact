import {Router} from 'express';
import {authenticateAdminToken} from "../middleware/authMiddleware.ts";
import {getSystemInformation} from "../controllers/systemInformationController.ts";

const router = Router();

router.post('/dashboard', authenticateAdminToken, getSystemInformation);