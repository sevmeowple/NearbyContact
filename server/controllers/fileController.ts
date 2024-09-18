import type { Request, Response } from 'express';
import { handleWorker } from '../workers/workerHandler.ts';

import { getImage } from '../services/fileService.ts';

export async function getImageHandler(req: Request, res: Response, type: 'original' | 'thumbnail') {
	const { imageId } = req.params;
	handleWorker('../workers/genericWorker.ts', {
		workerFunction: getImage,
		args: [imageId, type]
	}, res);
}

