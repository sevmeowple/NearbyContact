export interface IUser {
	id: string;
	user: string;
	role: 'user' | 'admin';
	status: 'active' | 'unverified' | 'banned';
	phone_number: string;
	QQ: string;
	address: string;
	gender: 'M' | 'F';
	email: string;
	avatarId: string;
}

export interface IOperation {
	userId: string;
	timestamp: number;
	after: any;
}

export interface IEventBase {
	name: string;
	status: 'open' | 'taken' | 'closed';
	type: string;
	description: string;
}

export interface IOffer extends IEventBase {
	id: string;
	imageIds: string[];
	operations: IOperation[];
}

export interface ICommission extends IEventBase {
	hash: string;
	owner: string;
}
