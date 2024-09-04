import type {ObjectId} from "mongoose";

export interface IUser {
    id: ObjectId;
    username: string;
    password: string;
    role: 'user' | 'admin';
    phone_number: string;
    QQ: string;
    address: string;
    gender: 'M' | 'F';
    email: string;
    avatarId: ObjectId;
}

export type EventState =
    | 'open'
    | 'taken'
    | 'closed'

export interface IOperation {
    userId: ObjectId;
    timestamp: number;
    after: any;
}

export interface IEvent {
    id: ObjectId;
    name: string;
    status: EventState;
    type: string;
    description: string;
    imageIds: ObjectId[];
    operations: IOperation[];
}
