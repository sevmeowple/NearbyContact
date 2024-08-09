import {Request, Response} from 'bun';
import { authenticate } from '../services/authService';

export async function login(req: Request, res: Response) {
    const { username, password } = req.json();
    try{
        const token = await authenticate(username, password);
        res.json({ token });
    }   catch(error){
        res.status(401).json({ error: 'Invalid credentials' });
    }
}