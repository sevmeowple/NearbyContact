import type {NextFunction, Request, Response} from 'express';
import {verifyToken} from '../services/authService';
import i18n from "../i18n.ts";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    const {language} = req.body;
    if (!token) {
        return res.status(401).json({error: i18n.t('accessDenied', {lng: language})});
    }

    try {
        req.body = verifyToken(token) as { userId: number, username: string };
        next();
    } catch (error: any) {
        res.status(403).json({error: error.message});
    }
}

export function authenticateAdminToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    const {language} = req.body;
    if (!token) {
        return res.status(401).json({error: i18n.t('accessDenied', {lng: language})});
    }

    try {
        const user = verifyToken(token) as { userId: number, username: string, role: string };
        if (user.role !== 'admin') {
            return res.status(403).json({error: i18n.t('accessDenied', {lng: language})});
        }
        req.body = user;
        next();
    } catch (error: any) {
        res.status(403).json({error: error.message});
    }
}