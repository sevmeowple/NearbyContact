import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });
    try{
        const user = verifyToken(token);
        req.body = user;
        next();
    }   catch(error){
        res.status(401).json({ error: 'Unauthorized' });
    }
}