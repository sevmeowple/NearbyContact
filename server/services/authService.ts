import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {FileRoles, UserRoles} from '../mongodb/mongo.ts';
import {JWT_SECRET} from '../config';
import {UserStateMachine} from './stateMachines/userStateMachine';
import type {ObjectId} from "mongoose";

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}

export async function authenticate(username: string, password: string) {
    const user = await UserRoles.selectByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
        return jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '12h'});
    }
    throw Object.assign(new Error('invalidCredentials'), {statusCode: 401});
}

export async function registerUser(username: string, password: string, phone_number: string, QQ: string, address: string, gender: 'M' | 'F', email: string, avatar: Buffer) {
    const existingUser = await UserRoles.selectByUsername(username);
    if (existingUser) {
        throw Object.assign(new Error('usernameTaken'), {statusCode: 400});
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const avatarId = await FileRoles.insert(avatar);
    await UserRoles.insert({
        username: username,
        password: hashedPassword,
        role: 'user',
        phone_number: phone_number,
        QQ: QQ,
        address: address,
        gender: gender,
        email: email,
        avatar: avatarId
    });
    return {username, email};
}

export async function editProfile(userId: ObjectId, operatorId: ObjectId, changes: any, avatar: Buffer) {
    const stateMachine = new UserStateMachine(userId, operatorId);
    stateMachine.editProfile();
    if (avatar) {
        await FileRoles.delete(((await UserRoles.selectById(userId))?.avatar as unknown as ObjectId));
        changes.avatar = await FileRoles.insert(avatar);
    }
    await UserRoles.editProfile(userId, changes);
}

export async function getSpecificProfile(userId: ObjectId) {
    return await UserRoles.selectById(userId);
}