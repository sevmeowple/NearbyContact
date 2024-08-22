import type {Request, Response} from 'express';
import {closeEvent, createEvent, reOpenEvent, selectAllOpenEvent, takeEvent} from '../services/eventService';
import {upload} from "../middleware/uploadMiddleware.ts";

export async function createEventHandler(req: Request, res: Response) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        const {name, type, description} = req.body;
        const imagePaths = req.files ? (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => `/uploads/${file.filename}`) : [];
        try {
            const event = await createEvent(name, type, description, imagePaths);
            res.status(201).json({event});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    });
}

export async function takeEventHandler(req: Request, res: Response) {
    const {eventId} = req.body;
    try {
        const event = await takeEvent(Number(eventId));
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function closeEventHandler(req: Request, res: Response) {
    const {eventId} = req.body;
    try {
        const event = await closeEvent(Number(eventId));
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function reOpenEventHandler(req: Request, res: Response) {
    const {eventId} = req.body;
    try {
        const event = await reOpenEvent(Number(eventId));
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function selectAllOpenEventHandler(req: Request, res: Response) {
    try {
        const events = await selectAllOpenEvent();
        res.status(200).json({events});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}