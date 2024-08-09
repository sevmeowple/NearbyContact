import { login } from "../controllers/authController";

export function authRoutes(){
    return[
        {method: 'POST', path: '/login', handler: login},
    ];
}