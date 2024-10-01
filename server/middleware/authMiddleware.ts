import type { NextFunction, Request, Response } from 'express';
import { cas } from '../index.ts';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
	if (req.user) {
		next();
	} else {
		res.redirect(cas.authenticate(req));
	}
}