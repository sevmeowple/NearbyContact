import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { FileRoles, UserRoles } from '../mapper/data.ts';
import { domain, indexPORT, JWT_SECRET, tokenEX } from '../config';
import { UserStateMachine } from './stateMachines/userStateMachine';
import { generateOneTimeToken, verifyOneTimeToken } from '../util/GenerateOneTimeToken.ts';
import { sendEmail } from './emailService.ts';
import type { IUser } from '../util/types.ts';
import { cacheClear, cacheGet, cacheSet } from '../mapper/redisClient.ts';


export function verifyToken(token: string) {
	return jwt.verify(token, JWT_SECRET);
}

export async function authenticate(username: string, password: string) {
	const user = await UserRoles.selectByUsername(username);
	if (user && bcrypt.compareSync(password, user.password)) {
		return { token: jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' }) };
	}
	throw Object.assign(new Error('invalidCredentials'), { statusCode: 401 });
}

export async function registerUser(username: string, password: string, phone_number: string, QQ: string, address: string, gender: 'M' | 'F', email: string, avatar: Buffer) {
	const existingUser = await UserRoles.selectByUsername(username);
	if (existingUser) {
		throw Object.assign(new Error('usernameTaken'), { statusCode: 400 });
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
	};
	await UserRoles.insert(user);
	return user;
}

export async function sendVerifyEmail(userId: string) {
	const user = await UserRoles.selectById(userId) as unknown as IUser;
	const { originalToken, token } = generateOneTimeToken(user.email);
	await sendEmail(
		user.email,
		'Verify Email',
		'Click the link below to verify your email: ' + `https://${domain}:${indexPORT}/verifyEmail/` + token,
		'<a href="' + `https://${domain}:${indexPORT}/verifyEmail/` + token + '">Click here to verify your email</a>'
	);
	await cacheSet.string(token, originalToken, tokenEX);
	return 'verifyEmailSent';
}

export async function verifyEmail(userId: string, token: string) {
	const user = await UserRoles.selectById(userId) as unknown as IUser;
	const originalToken = await cacheGet.string(token);
	if (!originalToken) {
		throw Object.assign(new Error('invalidToken'), { statusCode: 400 });
	}
	if (verifyOneTimeToken(token, user.email, originalToken)) {
		await UserRoles.updateStatus(userId, 'active');
		await cacheClear.string(token);
	} else {
		throw Object.assign(new Error('invalidToken'), { statusCode: 400 });
	}
	return 'emailVerified';
}

export async function editProfile(userId: string, operatorId: string, changes: any, avatar: Buffer) {
	const stateMachine = new UserStateMachine(userId, operatorId);
	stateMachine.editProfile();
	if (avatar) {
		await FileRoles.delete(((await UserRoles.selectById(userId))?.avatar as unknown as string));
		changes.avatar = await FileRoles.insert(avatar);
	}
	await UserRoles.editProfile(userId, changes);
}

export async function getSpecificProfile(userId: string) {
	return await UserRoles.selectById(userId);
}