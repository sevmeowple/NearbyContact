import { login } from "../controllers/authController";
import type { Request, Response } from "express"; 

export function authRoutes(){
    return[
        {method: 'POST', path: '/login', handler: (req: Request, res: Response) => login(req, res)},
    ];
}
