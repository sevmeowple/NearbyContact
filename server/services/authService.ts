import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from 'bun:sqlite'
import {JWT_SECRET} from '../config';

const db = new Database('app.sqlite');

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
}
const selectUserByUsername = db.prepare('SELECT * FROM tbl_users WHERE username = ?');

export function authenticate(username: string, password: string) {
    const user = selectUserByUsername.get(username) as User;

    if(user && bcrypt.compareSync(password, user.password)){
        return jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1h'})
    }
    throw new Error('Invalid credentials');

}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}