import {Worker} from 'worker_threads';
import path from 'path';
import i18n from '../i18n.ts';

export function handleWorker(workerPath: string, data: any, language: string, res: any) {
    const worker = new Worker(path.resolve(__dirname, workerPath));

    worker.on('message', (message) => {
        if (message.error) {
            res.status(400).json({error: i18n.t(message.error, {lng: language})});
        } else {
            res.status(200).json(message);
        }
    });

    worker.on('error', (error) => {
        res.status(500).json({error: i18n.t(error.message, {lng: language})});
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            res.status(500).json({error: i18n.t('Worker stopped with exit code ' + code, {lng: language})});
        }
    });

    worker.postMessage(data);
}