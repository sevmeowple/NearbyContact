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

export async function loginHandler(req: Request, res: Response) {
    const {username, password} = req.body;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: authenticate,
        args: [username, password]
    }, res);
}

export async function registerHandler(req: Request, res: Response) {
    const {username, password, phone_number, QQ, address, gender, email} = req.body;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: registerUser,
        args: [username, password, phone_number, QQ, address, gender, email, req.file]
    }, res);
}

export async function editProfileHandler(req: Request, res: Response) {
    const {userId, operatorId, changes} = req.body;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: editProfile,
        args: [userId, operatorId, changes]
    }, res);
}

export async function getSpecificProfileHandler(req: Request, res: Response) {
    const {userId} = req.body;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: getSpecificProfile,
        args: [userId]
    }, res);
}

export async function sendVerifyEmailHandler(req: Request, res: Response) {
    const {userId} = req.body;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: sendVerifyEmail,
        args: [userId]
    }, res);
}

export async function verifyEmailHandler(req: Request, res: Response) {
    const {userId} = req.body;
    const token = req.params;
    handleWorker('../workers/genericWorker.ts', {
        workerFunction: verifyEmail,
        args: [userId, token]
    }, res);
}