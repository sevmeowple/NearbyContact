import type {Request, Response} from 'express';
import {authenticate, registerUser} from '../services/authService';
import {image} from "../config.ts";
import {uploadFiles} from "../services/fileService.ts";
import i18n from "../i18n.ts";
import {handleWorker} from "../workers/workerHandler.ts";

export async function loginHandler(req: Request, res: Response) {
    const {username, password, language} = req.body;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: authenticate,
        args: [username, password]
    }, language, res);
}

export async function registerHandler(req: Request, res: Response) {
    await uploadFiles(req, res, async (err) => {
        const {username, password, phone_number, QQ, address, gender, email, language} = req.body;
        if (err) {
            return res.status(400).json({error: i18n.t(err.message, {lng: language})});
        }
        const avatar_path = req.file ? `${image.destination}${req.file.filename}` : '';
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: registerUser,
            args: [username, password]
        }, language, res);
    });
}