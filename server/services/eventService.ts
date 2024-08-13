import Database from 'bun:sqlite';

const db = new Database('app.sqlite');

type Event = {
    id: number;
    name: string;
    type: string;
    date: string;
    description: string;
    info: string[];
    status: boolean;
};

const insertEvent = db.prepare('INSERT INTO tbl_events (name, date, status, description, info) VALUES (?, ?, ?, ?, ?)');
const updateEventStatus = db.prepare('UPDATE tbl_events SET status = ? WHERE id = ?');

export async function createEvent(name: string, date: string, description: string, info: string) {
    insertEvent.run(name, date, 'open', description, info);
    return {name, date, status: 'open'};
}

export async function closeEvent(eventId: number) {
    updateEventStatus.run('closed', eventId);
    return {id: eventId, status: 'closed'};
}

export async function reOpenEvent(eventId: number) {
    updateEventStatus.run('open', eventId);
    return {id: eventId, status: 'open'};
}