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
    avatar_path: string;
}

export enum EventState {
    Open = 'open',
    Taken = 'taken',
    Closed = 'closed',
    Hidden = 'hidden'
}

export type Operation = {
    userId: number;
    timestamp: number;
    after: any;
}

export type Event = {
    id: number;
    name: string;
    status: 'open' | 'taken' | 'closed';
    type: string;
    description: string;
    imagePaths: string | string[];
    operations: string | Operation[];
};
