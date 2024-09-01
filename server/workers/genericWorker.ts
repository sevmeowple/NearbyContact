import {parentPort} from 'worker_threads';

parentPort?.on('message', async (data) => {
    const {workerFunction, args} = data;
    try {
        const result = await workerFunction(...args);
        parentPort?.postMessage(result);
    } catch (error: any) {
        parentPort?.postMessage({error: error.message, statusCode: error.statusCode});
    }
});