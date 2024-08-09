import { authenticateToken } from "../middleware/authMiddleware";

export function userRoutes(){
    return[
        {method: 'GET', path: '/user', handler: (req, res) => {
            res.json({ user: req.user });
          }, middleware: [authenticateToken]},
    ];
}