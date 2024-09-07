import type {Request, Response} from 'express';
import {
    authenticate,
    editProfile,
    getSpecificProfile,
    registerUser,
    sendVerifyEmail,
    verifyEmail
} from '../services/authService';
import {handleWorker} from "../workers/workerHandler.ts";
import i18n from "i18next";

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

export async function sendVerifyEmailHandler(req: Request, res: Response) {
    try {
        const {userId, language} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: sendVerifyEmail,
            args: [userId]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

export async function verifyEmailHandler(req: Request, res: Response) {
    try {
        const {userId, language} = req.body;
        const token = req.params;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: verifyEmail,
            args: [userId, token]
        }, language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}