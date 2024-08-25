import type {Request, Response} from 'express';
import {authenticate, registerUser} from '../services/authService';
import {image} from "../config.ts";
import {handleWorker} from "../workers/workerHandler.ts";

export async function loginHandler(req: Request, res: Response) {
    try {
        const {username, password, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: authenticate,
            args: [username, password]
        }, language, res);
    } catch (error: any) {
        res.status(418).json({error: "I'm a teapot."});
    }
}

export async function registerHandler(req: Request, res: Response) {
    try {
        const {username, password, phone_number, QQ, address, gender, email, language} = req.body;
        const avatar_path = req.file ? `${image.destination}${req.file.filename}` : '';
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: registerUser,
            args: [username, password, phone_number, QQ, address, gender, email, avatar_path]
        }, language, res);
    } catch (error: any) {
        res.status(418).json({error: "I'm a teapot."});
    }
}