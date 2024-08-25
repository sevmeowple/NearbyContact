import type {Request, Response} from 'express';
import {changeEventStatus, createEvent, editEvent} from '../services/eventService';
import {image} from "../config.ts";
import {uploadFiles} from "../services/fileService.ts";
import type {Operation} from "../types.ts";
import i18n from "../i18n.ts";
import {handleWorker} from "../workers/workerHandler.ts";

export async function createEventHandler(req: Request, res: Response) {
    try {
        await uploadFiles(req, res, async (error) => {
            const {name, type, description, userId, language} = req.body;
            if (error) {
                return res.status(400).json({error: i18n.t(error.message, {lng: language})});
            }
            const imagePaths = req.files ? (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => `${image.destination}${file.filename}`) : [];
            handleWorker('../workers/genericWorker.ts', {
                workerFunction: createEvent,
                args: [name, type, description, imagePaths, userId]
            }, language, res);
        });
    } catch (error: any) {
        res.status(418).json({ error: "I'm a teapot." });
    }
}

export async function editEventHandler(req: Request, res: Response) {
    try {
        await uploadFiles(req, res, async (error) => {
            const {eventId, userId, name, type, description, language} = req.body;
            if (error) {
                return res.status(400).json({error: i18n.t(error.message, {lng: language})});
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
            handleWorker('../workers/genericWorker.ts', {
                workerFunction: editEvent,
                args: [eventId, userId, changes]
            }, language, res);
        });
    } catch (error: any) {
        res.status(418).json({ error: "I'm a teapot." });
    }
}

export async function changeEventStatusHandler(req: Request, res: Response) {
    try {
        const {eventId, userId, status, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: changeEventStatus,
            args: [eventId, userId, status]
        }, language, res);
    } catch (error: any) {
        res.status(418).json({ error: "I'm a teapot." });
    }
}