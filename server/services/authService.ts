import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {FileRoles, UserRoles} from '../mongodb/mongo.ts';
import {defaultPORT, domain, JWT_SECRET} from '../config';
import {UserStateMachine} from './stateMachines/userStateMachine';
import type {ObjectId} from "mongoose";
import {generateOneTimeToken, verifyOneTimeToken} from "../util/GenerateOneTimeToken.ts";
import {sendEmail} from "./emailService.ts";
import type {IUser} from "../util/types.ts";
import {getGlobalVariable, setGlobalVariableWithExpiry} from "../util/globalVariables.ts";

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}

export async function authenticate(username: string, password: string) {
    const user = await UserRoles.selectByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
        return {token: jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '12h'})};
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
    const user = {
        username: username,
        password: hashedPassword,
        role: 'user',
        status: 'unverified',
        phone_number: phone_number,
        QQ: QQ,
        address: address,
        gender: gender,
        email: email,
        avatarId: avatarId
    }
    await UserRoles.insert(user);
    return user;
}

export async function sendVerifyEmail(userId: ObjectId) {
    const user = await UserRoles.selectById(userId) as unknown as IUser;
    const {originalToken, token} = generateOneTimeToken(user.email);
    await sendEmail(
        user.email,
        'Verify Email',
        'Click the link below to verify your email: ' + `https://${domain}:${defaultPORT}/verifyEmail/` + token,
        '<a href="' + `https://${domain}:${defaultPORT}/verifyEmail/` + token + '">Click here to verify your email</a>'
    );
    await setGlobalVariableWithExpiry(token, originalToken, 86400);
    return 'verifyEmailSent';
}

export async function verifyEmail(userId: ObjectId, token: string) {
    const user = await UserRoles.selectById(userId) as unknown as IUser;
    const originalToken = await getGlobalVariable(token);
    if (!originalToken) {
        throw Object.assign(new Error('invalidToken'), {statusCode: 400});
    }
    if (verifyOneTimeToken(token, user.email, originalToken)) {
        await UserRoles.updateStatus(userId, 'active');
    } else {
        throw Object.assign(new Error('invalidToken'), {statusCode: 400});
    }
    return 'emailVerified';
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