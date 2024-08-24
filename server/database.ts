import Database from 'bun:sqlite';

const db = new Database('app.sqlite');

export const UserRoles = {
    selectByUsername: db.prepare('SELECT * FROM tbl_users WHERE username = ?'),
    selectById: db.prepare('SELECT * FROM tbl_users WHERE id = ?'),
    insert: db.prepare('INSERT INTO tbl_users (username, password, role, phone_number, QQ, address, gender, email, avatar_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'),
}

export const EventRoles = {
    insert: db.prepare('INSERT INTO tbl_events (name, date, status, type, description, imagePaths, operations) VALUES (?, ?, ?, ?, ?, ?, ?)'),
    edit: db.prepare('UPDATE tbl_events SET name = ?, type = ?, description = ?, imagePaths = ? WHERE id = ?'),
    selectById: db.prepare('SELECT * FROM tbl_events WHERE id = ?'),
    getStatus: db.prepare('SELECT status FROM tbl_events WHERE id = ?'),
    getOperations: db.prepare('SELECT operations FROM tbl_events WHERE id = ?'),
    updateStatus: db.prepare('UPDATE tbl_events SET status = ? WHERE id = ?'),
    updateOperations: db.prepare('UPDATE tbl_events SET operations = ? WHERE id = ?'),
    selectAllOpen: db.prepare('SELECT * FROM tbl_events WHERE status = \'open\' '),
}