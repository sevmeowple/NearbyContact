import type {Request, Response} from 'express';
import {changeEventStatus, createEvent, editEvent} from '../services/eventService';
import {image} from "../config.ts";
import {getMessage} from "../message.ts";
import {uploadFiles} from "../services/fileService.ts";

import type {Operation} from "../types.ts";

export async function createEventHandler(req: Request, res: Response) {
    await uploadFiles(req, res, async (error) => {
        const {name, type, description, userId, language} = req.body;
        if (error) {
            return res.status(400).json({error: getMessage(language, error.message)});
        }
        const imagePaths = req.files ? (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => `${image.destination}${file.filename}`) : [];
        try {
            await createEvent(name, type, description, imagePaths, userId);
            res.status(201);
        } catch (error: any) {
            res.status(400).json({error: getMessage(language, error.message)});
        }
    });
}

export async function editEventHandler(req: Request, res: Response) {
    await uploadFiles(req, res, async (error) => {
        const {eventId, userId, name, type, description, language} = req.body;
        if (error) {
            return res.status(400).json({error: getMessage(language, error.message)});
        }
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
            res.status(200);
        } catch (error: any) {
            res.status(400).json({error: getMessage(language, error.message)});
        }
    });
}

export async function changeEventStatusHandler(req: Request, res: Response) {
    const {eventId, userId, status, language} = req.body;
    try {
        await changeEventStatus(Number(eventId), userId, status);
        res.status(200);
    } catch (error: any) {
        res.status(400).json({error: getMessage(language, error.message)});
    }
}