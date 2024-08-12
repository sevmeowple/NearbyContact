import {Router} from 'express';
import {authenticateToken} from '../middleware/authMiddleware';

const router = Router();

router.get('/user', authenticateToken, (req, res) => {
    res.json({user: req.body});
});

export const userRoutes = router;