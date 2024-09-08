import * as mongoose from "mongoose";
import {log} from "../util/log.ts";

mongoose.connect("mongodb://127.0.0.1:10002");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    log('INFO', 'Connected to MongoDB');
});

const fileSchema = new mongoose.Schema({
    thumbnail: {type: Buffer, required: true},
    original: {type: Buffer, required: true},
});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    status: {type: String, required: true},
    phone_number: {type: String},
    QQ: {type: String},
    address: {type: String},
    gender: {type: String},
    email: {type: String, required: true, unique: true},
    avatar: {type: Number},
});

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    timestamp: {type: Number, required: true},
    status: {type: String, required: true},
    type: {type: String},
    description: {type: String},
    images: {type: [Number]},
    operations: {type: [Object]},
});

export const File = mongoose.model('file', fileSchema)
export const User = mongoose.model('User', userSchema);
export const Event = mongoose.model('Event', eventSchema);
