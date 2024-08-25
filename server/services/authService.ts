import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRoles } from '../mongodb/database.ts';
import { JWT_SECRET } from '../config';

import type { User } from "../types.ts";

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}

export async function authenticate(username: string, password: string) {
    const user = await UserRoles.selectByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
        return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' });
    }
    throw Object.assign(new Error('invalidCredentials'), { statusCode: 401 });
}

export async function registerUser(username: string, password: string, phone_number: string, QQ: string, address: string, gender: 'M' | 'F', email: string, avatar_path: string) {
    const existingUser = await UserRoles.selectByUsername(username);
    if (existingUser) {
        throw Object.assign(new Error('usernameTaken'), { statusCode: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await UserRoles.insert({ username, password: hashedPassword, role: 'user', phone_number, QQ, address, gender, email, avatar: avatar_path });

    return { username, email };
}