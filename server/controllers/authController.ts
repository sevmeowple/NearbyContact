import type {Request, Response} from 'express';
import {authenticate, registerUser} from '../services/authService';

export async function login(req: Request, res: Response) {
    const {username, password} = req.body;
    try {
        const token = authenticate(username, password);
        res.json({token});
    } catch (error: any) {
        res.status(401).json({error: error.message});
    }
}

export async function register(req: Request, res: Response) {
    const {username, email, password} = req.body;
    try {
        const user = await registerUser(username, email, password);
        res.status(201).json({user});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}