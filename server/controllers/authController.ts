import type {Request, Response} from 'express';
import {authenticate} from '../services/authService';

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    try{
        const token = authenticate(username, password);
        res.json({ token });
    }   catch(error){
        res.status(401).json({ error: 'Invalid credentials' });
    }
}