import { Worker } from 'worker_threads';
import path from 'path';

export function handleWorker(workerPath: string, data: any, res: any) {
	const worker = new Worker(path.resolve(__dirname, workerPath));

	worker.on('message', (result) => {
		res.status(result.statusCode || 200);
		res.cookies = result.cookies;
		res.body = result.body;
		res.file = result.file;
	});

	worker.postMessage(data);
}