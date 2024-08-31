import type {Request, Response} from 'express';
import {authenticate, editProfile, getSpecificProfile, registerUser} from '../services/authService';
import {handleWorker} from "../workers/workerHandler.ts";
import i18n from "../util/i18n.ts";

export async function loginHandler(req: Request, res: Response) {
    try {
        const {username, password, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: authenticate,
            args: [username, password]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

export async function registerHandler(req: Request, res: Response) {
    try {
        const {username, password, phone_number, QQ, address, gender, email, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: registerUser,
            args: [username, password, phone_number, QQ, address, gender, email, req.file]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

export async function editProfileHandler(req: Request, res: Response) {
    try {
        const {userId, operatorId, changes, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: editProfile,
            args: [userId, operatorId, changes]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

export async function getSpecificProfileHandler(req: Request, res: Response) {
    try {
        const {userId, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: getSpecificProfile,
            args: [userId]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}