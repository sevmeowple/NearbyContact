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
    imagePaths: string[];
    operations: Operation[];
};

export type EventJSON = {
    id: number;
    name: string;
    status: string;
    type: string;
    description: string;
    imagePaths: string;
    operations: string;
};

export function eventToJSON(event: Event): EventJSON {
    return {
        id: event.id,
        name: event.name,
        status: JSON.stringify(event.status),
        type: event.type,
        description: event.description,
        imagePaths: JSON.stringify(event.imagePaths),
        operations: JSON.stringify(event.operations)
    }
}

export function eventFromJSON(event: EventJSON): Event {
    return {
        id: event.id,
        name: event.name,
        status: JSON.parse(event.status),
        type: event.type,
        description: event.description,
        imagePaths: JSON.parse(event.imagePaths),
        operations: JSON.parse(event.operations)
    }
}
