import type {NextFunction, Request, Response} from 'express';
import {verifyToken} from '../services/authService';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }

    try {
        req.body = verifyToken(token) as {userId: number, username: string};
        next();
    } catch (error: any) {
        res.status(403).json({error: error.message});
    }
}