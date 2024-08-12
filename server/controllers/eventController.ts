import type {Request, Response} from 'express';
import {closeEvent, createEvent, reOpenEvent} from '../services/eventService';

export async function createEventHandler(req: Request, res: Response) {
    const {name, date} = req.body;
    try {
        const event = await createEvent(name, date);
        res.status(201).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function closeEventHandler(req: Request, res: Response) {
    const {eventId} = req.params;
    try {
        const event = await closeEvent(Number(eventId));
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function reOpenEventHandler(req: Request, res: Response) {
    const {eventID} = req.params;
    try {
        const event = await reOpenEvent(Number(eventID));
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}