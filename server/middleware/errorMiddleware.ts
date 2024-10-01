import type { NextFunction, Request, Response } from 'express';
import { log } from '../util/log.ts';
import { i18n } from '../index.ts';

export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	log('WARN', 'handling request with error' + error.message);
	res.status(error.statusCode || 500).json(i18n.t('internalServerError', { lng: req.language }) || 'unknownError');
}