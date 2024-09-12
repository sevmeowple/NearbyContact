import { Worker } from 'worker_threads';
import path from 'path';

export function handleWorker(workerPath: string, data: any, res: any) {
	const worker = new Worker(path.resolve(__dirname, workerPath));

	worker.on('message', (result) => {
		res.status(result.statusCode || 200);
		if (result.token) {
			res.cookies = result.token;
		} else {
			res.body = result;
		}

	});

	worker.postMessage(data);
}