import type { NextFunction, Request, Response } from 'express';
import { addDocument, searchDocument } from '../mapper/elastic.ts';
import { log } from '../util/log.ts';

export async function antiShakeMiddleware(req: Request, res: Response, next: NextFunction) {
	const { hash } = req.body;
	if (!hash) {
		throw new Error('invalidRequest');
	}
	if (await searchDocument('10min', hash)) {
		throw new Error('doNotSubmitAgain');
	}
	addDocument('10min', hash, { hash, timestamp: Date.now() })
		.catch((err: any) => log('WARN', 'Failed to load cache with error' + err));
	next();
}