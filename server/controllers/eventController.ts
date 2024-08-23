import type {Request, Response} from 'express';
import {closeEvent, createEvent, reOpenEvent, selectAllOpenEvent, takeEvent} from '../services/eventService';
import {upload} from "../middleware/uploadMiddleware.ts";
import {image} from "../config.ts";
import {EventRoles, type Operation} from "../database.ts";
import {getMessage} from "../message.ts";

async function getCreatorId(eventId: number) {
    const JSONOperations = EventRoles.getOperations.get(eventId) as string;
    const operations = JSON.parse(JSONOperations) as Operation[];
    return operations[0].userId;
}

export async function createEventHandler(req: Request, res: Response) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        const {name, type, description, userId} = req.body;
        const imagePaths = req.files ? (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => `${image.destination}${file.filename}`) : [];
        try {
            const event = await createEvent(name, type, description, imagePaths, userId);
            res.status(201).json({event});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    });
}

export async function takeEventHandler(req: Request, res: Response) {
    const {eventId, userId, language} = req.body;
    if (userId === await getCreatorId(Number(eventId))) {
        return res.status(400).json({error: getMessage(language , 'cannotTakeOwnEvent')});
    }
    try {
        const event = await takeEvent(Number(eventId), userId);
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function closeEventHandler(req: Request, res: Response) {
    const {eventId, userId, language} = req.body;
    if (userId !== await getCreatorId(Number(eventId))) {
        return res.status(400).json({error: getMessage(language, 'cannotCloseOthersEvent')});
    }
    try {
        const event = await closeEvent(Number(eventId), userId);
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function reOpenEventHandler(req: Request, res: Response) {
    const {eventId, userId, language} = req.body;
    if (userId !== await getCreatorId(Number(eventId))) {
        return res.status(400).json({error: getMessage(language, 'cannotReopenOthersEvent')});
    }
    try {
        const event = await reOpenEvent(Number(eventId), userId);
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