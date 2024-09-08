import type {Request, Response} from 'express';
import {changeEventStatus, createEvent, editEvent, getAllOpenEvents, getSpecificEvent} from '../services/eventService';
import {handleWorker} from "../workers/workerHandler.ts";
import {EventStateMachine} from "../services/stateMachines/eventStateMachine.ts";

export async function createEventHandler(req: Request, res: Response) {
    const {name, type, description, userId} = req.body;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: createEvent,
        args: [name, type, description, req.files, userId]
    }, res);
}

export async function editEventHandler(req: Request, res: Response) {
    const {eventId, userId, changes} = req.body;
    const stateMachine = new EventStateMachine(eventId, userId);
    stateMachine.changeContents();
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: editEvent,
        args: [eventId, userId, changes]
    }, res);
}

export async function changeEventStatusHandler(req: Request, res: Response) {
    const {eventId, userId, status} = req.body;
    const stateMachine = new EventStateMachine(eventId, userId);
    stateMachine.changeStatus(status);
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: changeEventStatus,
        args: [eventId, userId, status]
    }, res);
}

export async function getAllOpenEventHandler(req: Request, res: Response) {
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: getAllOpenEvents,
        args: []
    }, res);
}

export async function getSpecificEventHandler(req: Request, res: Response) {
    const {eventId} = req.params;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: getSpecificEvent,
        args: [eventId]
    }, res)
}