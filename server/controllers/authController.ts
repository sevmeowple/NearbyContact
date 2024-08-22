import type {Request, Response} from 'express';
import {authenticate, registerUser} from '../services/authService';
import {upload} from "../middleware/uploadMiddleware.ts";

export async function login(req: Request, res: Response) {
    const {username, password} = req.body;
    try {
        const token = authenticate(username, password);
        res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 43200000});
    } catch (error: any) {
        res.status(401).json({error: error.message});
    }
}

export async function register(req: Request, res: Response) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        const {username, password, phone_number, QQ, address, gender, email} = req.body;
        const avatar_path = req.file ? `/uploads/${req.file.filename}` : '';
        try {
            const user = await registerUser(username, password, phone_number, QQ, address, gender, email, avatar_path)
            res.status(201).json({event});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    });
}