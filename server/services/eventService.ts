import Database from 'bun:sqlite';

const db = new Database('app.sqlite');

type Event = {
    id: number;
    name: string;
    date: string;
    description: string;
    info: string[];
    status: string;
};

const insertEvent = db.prepare('INSERT INTO tbl_events (name, date, status, description, info) VALUES (?, ?, ?)');
const updateEventStatus = db.prepare('UPDATE tbl_events SET status = ? WHERE id = ?');

export async function createEvent(name: string, date: string, description: string, info: string) {
    insertEvent.run(name, date, description, info, true);
    return {name, date, status: 'open'};
}

export async function closeEvent(eventId: number) {
    updateEventStatus.run(false, eventId);
    return {id: eventId, status: 'closed'};
}

export async function reOpenEvent(eventId: number) {
    updateEventStatus.run(true, eventId);
    return {id: eventId, status: 'open'};
}