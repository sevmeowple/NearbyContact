import type {Request, Response} from 'express';
import {authenticate, registerUser} from '../services/authService';
import {image} from "../config.ts";
import {handleWorker} from "../workers/workerHandler.ts";
import i18n from "../i18n.ts";

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
            args: [username, password, phone_number, QQ, address, gender, email, req.files]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}