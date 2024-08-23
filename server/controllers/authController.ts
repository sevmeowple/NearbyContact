import type {Request, Response} from 'express';
import {authenticate, registerUser} from '../services/authService';
import {upload} from "../middleware/uploadMiddleware.ts";
import {image} from "../config.ts";
import {getMessage} from "../message.ts";

export async function login(req: Request, res: Response) {
    const {username, password, language} = req.body;
    try {
        const token = authenticate(username, password);
        res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 43200000});
    } catch (error: any) {
        res.status(401).json({error: getMessage(language, error.message)});
    }
}

export async function register(req: Request, res: Response) {
    upload(req, res, async (err) => {
        const {username, password, phone_number, QQ, address, gender, email, language} = req.body;
        if (err) {
            return res.status(400).json({error: getMessage(language, err.message)});
        }
        const avatar_path = req.file ? `${image.destination}${req.file.filename}` : '';
        try {
            const user = await registerUser(username, password, phone_number, QQ, address, gender, email, avatar_path)
            res.status(201).json({user});
        } catch (error: any) {
            res.status(400).json({error: getMessage(language, error.message)});
        }
    });
}