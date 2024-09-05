import type {ObjectId} from "mongoose";

export interface IUser {
    id: ObjectId;
    username: string;
    password: string;
    role: 'user' | 'admin';
    status: 'active' | 'unverified' | 'banned';
    phone_number: string;
    QQ: string;
    address: string;
    gender: 'M' | 'F';
    email: string;
    avatarId: ObjectId;
}

export interface IOperation {
    userId: ObjectId;
    timestamp: number;
    after: any;
}

export interface IEvent {
    id: ObjectId;
    name: string;
    status: 'open' | 'taken' | 'closed';
    type: string;
    description: string;
    imageIds: ObjectId[];
    operations: IOperation[];
}
