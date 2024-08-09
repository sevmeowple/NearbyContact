import { authenticateToken } from "../middleware/authMiddleware";
import type { Request, Response } from "express"; 

export function userRoutes(){
    return[
        {method: 'GET', path: '/user', handler: (req: Request, res: Response) => {
            res.json({ user: req.body });
          }, middleware: [authenticateToken]},
    ];
}