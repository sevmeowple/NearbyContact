import type {Request, Response} from 'express';
import si from 'systeminformation';

export async function getSystemInformation(req: Request, res: Response) {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const disksIO = await si.disksIO();
    const networkStats = await si.networkStats();

    res.status(200).json({
        cpu,
        mem,
        disksIO,
        networkStats
    })
}