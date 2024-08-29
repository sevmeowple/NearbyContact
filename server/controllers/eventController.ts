import type {Request, Response} from 'express';
import {changeEventStatus, createEvent, editEvent, getAllOpenEvents} from '../services/eventService';
import type {Operation} from "../util/types.ts";
import i18n from "../util/i18n.ts";
import {handleWorker} from "../workers/workerHandler.ts";
import {EventStateMachine} from "../services/stateMachines/eventStateMachine.ts";

export async function createEventHandler(req: Request, res: Response) {
    try {
        const {name, type, description, userId, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: createEvent,
            args: [name, type, description, req.files, userId]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

export async function editEventHandler(req: Request, res: Response) {
    try {
        const {eventId, userId, name, type, description, language} = req.body;
        const stateMachine = new EventStateMachine(eventId, userId);
        stateMachine.changeContents();
        const changes: Operation = {
            userId: userId,
            timestamp: Date.now(),
            after: {
                name: name,
                type: type,
                description: description,
                images: req.files
            }
        }
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: editEvent,
            args: [eventId, userId, changes]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

export async function changeEventStatusHandler(req: Request, res: Response) {
    try {
        const {eventId, userId, status, language} = req.body;
        const stateMachine = new EventStateMachine(eventId, userId);
        stateMachine.changeStatus(status);
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: changeEventStatus,
            args: [eventId, userId, status]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

export async function getAllOpenEventHandler(req: Request, res: Response) {
    try {
        const {language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: getAllOpenEvents,
            args: []
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}