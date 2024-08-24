import type {Request, Response} from 'express';
import si from 'systeminformation';
import {getMessage} from "../message.ts";

export async function getSystemInformation(req: Request, res: Response) {
    const {language} = req.body;
    try {
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
    } catch (error: any) {
        res.status(500).json({ error: getMessage(language, error.message) });
    }
}