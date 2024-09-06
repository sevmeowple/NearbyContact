import type {ObjectId} from "mongoose";
import * as mongoose from "mongoose";
import {log} from "../../util/log.ts";
import {generateThumbnail} from "../../util/thumbnail.ts";

mongoose.connect("mongodb://127.0.0.1:27017");

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

export const FileRoles = {
    insert: async (original: Buffer) => {
        const thumbnail = await generateThumbnail(original);
        const file = new File({thumbnail, original});
        return (await file.save()).id;
    },
    delete: async (id: ObjectId) => await File.findByIdAndDelete(id),
    selectThumbnailById: async (id: ObjectId) => await File.findById(id, 'thumbnail'),
    selectOriginalById: async (id: ObjectId) => await File.findById(id, 'original'),
};


export const UserRoles = {
    insert: async (userData: any) => {
        const user = new User(userData);
        return await user.save();
    },
    selectByUsername: async (username: string) => await User.findOne({username}),
    selectById: async (id: ObjectId) => await User.findById(id),
    updateStatus: async (id: ObjectId, status: 'active' | 'unverified' | 'banned') => await User.findByIdAndUpdate(id, {status: status}, {new: true}),
    editProfile: async (id: ObjectId, userData: any) => await User.findByIdAndUpdate(id, userData, {new: true}),
};

export const EventRoles = {
    insert: async (eventData: any) => {
        const event = new Event(eventData);
        return await event.save();
    },
    edit: async (id: ObjectId, eventData: any) => await Event.findByIdAndUpdate(id, eventData, {new: true}),
    selectById: async (id: ObjectId) => await Event.findById(id),
    updateStatus: async (id: ObjectId, status: string) => await Event.findByIdAndUpdate(id, {status}, {new: true}),
    updateOperations: async (id: ObjectId, operations: any) => await Event.findByIdAndUpdate(id, {operations}, {new: true}),
    selectAllOpen: async () => await Event.find({status: 'open'}, 'name type timestamp'),
};