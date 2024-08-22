import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {type User, UserRoles} from '../database';
import {JWT_SECRET} from '../config';

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}

export function authenticate(username: string, password: string) {
    const user = UserRoles.selectByUsername.get(username) as User;

    if (user && bcrypt.compareSync(password, user.password)) {
        return jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '12h'})
    }
    throw new Error('Invalid credentials');

}

export async function registerUser(username: string, password: string, phone_number: string, QQ: string, address: string, gender: 'M' | 'F', email: string, avater_path: string) {
    const existingUser = UserRoles.selectByUsername.get(username) as User;
    if (existingUser) {
        throw new Error('Username already taken');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    UserRoles.insert.run(username, hashedPassword, 'user', phone_number, QQ, address, gender, email, avater_path);

    return {username, email};
}