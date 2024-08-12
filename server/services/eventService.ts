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

// 创建表的函数
function createTableIfNotExists() {
    db.run(`
        CREATE TABLE IF NOT EXISTS tbl_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT,
            info TEXT,
            status TEXT NOT NULL
        )
    `);
}

// 调用创建表的函数
createTableIfNotExists();

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