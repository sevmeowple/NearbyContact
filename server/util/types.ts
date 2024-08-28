export type User = {
    id: number;
    username: string;
    password: string;
    role: 'user' | 'admin';
    phone_number: string;
    QQ: string;
    address: string;
    gender: 'M' | 'F';
    email: string;
    avatarId: number;
}

export enum EventState {
    Open = 'open',
    Taken = 'taken',
    Closed = 'closed',
}

export type Operation = {
    userId: number;
    timestamp: number;
    after: any;
}

export type Event = {
    id: number;
    name: string;
    status: EventState;
    type: string;
    description: string;
    imageIds: number[];
    operations: Operation[];
};
