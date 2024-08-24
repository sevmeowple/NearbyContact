import type {Request, Response} from 'express';
import {createEvent, editEvent, EventChangeStatus, selectAllOpenEvent,} from '../services/eventService';
import {image} from "../config.ts";
import {EventRoles, type Operation} from "../database.ts";
import {getMessage} from "../message.ts";
import {uploadFiles} from "../services/fileService.ts";

async function getOperationUser(eventId: number, step: number) {
    const JSONOperations = EventRoles.getOperations.get(eventId) as string;
    const operations = JSON.parse(JSONOperations) as Operation[];
    const length = operations.length
    return operations[(step % length + length) % length].userId;
}

export async function createEventHandler(req: Request, res: Response) {
    await uploadFiles(req, res, async (err) => {
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

export async function editEventHandler(req: Request, res: Response) {
    await uploadFiles(req, res, async (err) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        const {eventId, userId, name, type, description, language} = req.body;
        const imagePaths = req.files ? (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => `${image.destination}${file.filename}`) : [];
        const changes: Operation = {
            userId: userId,
            timestamp: Date.now(),
            after: {
                name: name,
                type: type,
                description: description,
                imagePaths: imagePaths
            }
        };
        try {
            await editEvent(Number(eventId), userId, changes);
            res.status(200).json({event: {id: eventId, name, type, description, imagePaths}});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    });
}

export async function takeEventHandler(req: Request, res: Response) {
    const {eventId, userId, language} = req.body;
    if (userId === await getOperationUser(Number(eventId), 0)) {
        return res.status(400).json({error: getMessage(language, 'cannotTakeOwnEvent')});
    }
    try {
        const event = await EventChangeStatus(Number(eventId), userId, 'taken');
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function cancelTakeEventHandler(req: Request, res: Response) {
    const {eventId, userId, language} = req.body;
    const status = EventRoles.getStatus.get(Number(eventId));
    switch (status) {
        case 'open':
            return res.status(400).json({error: getMessage(language, 'cannotCancelTakeOpenEvent')});
        case 'closed':
            return res.status(400).json({error: getMessage(language, 'cannotCancelTakeClosedEvent')});
    }
    const taker = await getOperationUser(Number(eventId), -1);
    if (taker !== userId) {
        return res.status(400).json({error: getMessage(language, 'cannotCancelTakeOthersEvent')});
    }
    try {
        const event = await EventChangeStatus(Number(eventId), userId, 'open');
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function closeEventHandler(req: Request, res: Response) {
    const {eventId, userId, language} = req.body;
    if (userId !== await getOperationUser(Number(eventId), 0)) {
        return res.status(400).json({error: getMessage(language, 'cannotCloseOthersEvent')});
    }
    try {
        const event = await EventChangeStatus(Number(eventId), userId, 'closed');
        res.status(200).json({event});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function reOpenEventHandler(req: Request, res: Response) {
    const {eventId, userId, language} = req.body;
    if (userId !== await getOperationUser(Number(eventId), 0)) {
        return res.status(400).json({error: getMessage(language, 'cannotReopenOthersEvent')});
    }
    try {
        const event = await EventChangeStatus(Number(eventId), userId, 'open');
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