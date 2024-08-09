import {Request, Response, NextFuntion} from 'bun';
import { verifyToken } from '../services/authService';

export function authenticateToken(req: Request, res: Response, next: NextFuntion) {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });
    try{
        const user = verifyToken(token);
        req.user = user;
        next();
    }   catch(error){
        res.status(401).json({ error: 'Unauthorized' });
    }
}