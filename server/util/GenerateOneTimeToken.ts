import crypto from 'crypto';

export function generateOneTimeToken(email: string) {
	const originalToken = crypto.randomBytes(12).toString('hex');
	const token = crypto.createHash('sha256').update(originalToken + email).digest('hex');
	return {
		originalToken: originalToken,
		token: token
	};
}

export function verifyOneTimeToken(token: string, email: string, originalToken: string) {
	return token === crypto.createHash('sha256').update(originalToken + email).digest('hex');
}