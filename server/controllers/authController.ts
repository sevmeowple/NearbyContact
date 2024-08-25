import type {Request, Response} from 'express';
import {authenticate, registerUser} from '../services/authService';
import {image} from "../config.ts";
import {uploadFiles} from "../services/fileService.ts";
import i18n from "../i18n.ts";

export async function login(req: Request, res: Response) {
    const {username, password, language} = req.body;
    try {
        const token = authenticate(username, password);
        res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 43200000});
    } catch (error: any) {
        res.status(401).json({error: i18n.t(error.message, {lng: language})});
    }
}

export async function register(req: Request, res: Response) {
    await uploadFiles(req, res, async (err) => {
        const {username, password, phone_number, QQ, address, gender, email, language} = req.body;
        if (err) {
            return res.status(400).json({error: i18n.t(err.message, {lng: language})});
        }
        const avatar_path = req.file ? `${image.destination}${req.file.filename}` : '';
        try {
            await registerUser(username, password, phone_number, QQ, address, gender, email, avatar_path)
            res.status(201);
        } catch (error: any) {
            res.status(400).json({error: i18n.t(error.message, {lng: language})});
        }
    });
}