import {Worker} from 'worker_threads';
import path from 'path';
import i18n from '../util/i18n.ts';

export function handleWorker(workerPath: string, data: any, language: string, res: any) {
    const worker = new Worker(path.resolve(__dirname, workerPath));

    worker.on('message', (result) => {
        if (result.error) {
            res.status(result.statusCode || 400).json({error: i18n.t(result.error, {lng: language})});
        } else {
            res.status(result.statusCode || 200);
            if (result.token) {
                res.cookies = result.token;
            } else {
                res.body = result;
            }
        }
    });

    worker.on('error', (error) => {
        res.status(500).json({error: i18n.t(error.message, {lng: language})});
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            res.status(500).json({error: i18n.t('internalError' + code, {lng: language})});
        }
    });

    worker.postMessage(data);
}