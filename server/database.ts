// database.ts
import Database from 'bun:sqlite';
import fs from 'fs';

const db = new Database('app.sqlite');

// Read and execute schema.sql to initialize the database schema
const schema = fs.readFileSync('schema.sql', 'utf8');
db.exec(schema);

export default db;