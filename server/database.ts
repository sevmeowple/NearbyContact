import Database from 'bun:sqlite';

const db = new Database('app.sqlite');

export type User = {
    id: number;
    username: string;
    password: string;
    role: string;
    phone_number: string;
    QQ: string;
    address: string;
    gender: 'M' | 'F';
    email: string;
    avatar_path: string;
}

export const UserRoles = {
    selectByUsername: db.prepare('SELECT * FROM tbl_users WHERE username = ?'),
    insert: db.prepare('INSERT INTO tbl_users (username, password, role, phone_number, QQ, address, gender, email, avatar_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'),
}

export type Event = {
    id: number;
    name: string;
    date: string;
    status: boolean;
    type: string;
    description: string;
    imagePaths: string | string[];
};

export const EventRoles = {
    insert: db.prepare('INSERT INTO tbl_events (name, date, status, type, description, imagePaths) VALUES (?, ?, ?, ?, ?, ?)'),
    updateStatus: db.prepare('UPDATE tbl_events SET status = ? WHERE id = ?'),
    selectAllOpen: db.prepare('SELECT * FROM tbl_events WHERE status = true'),
}