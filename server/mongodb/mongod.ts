import * as mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    phone_number: {type: String},
    QQ: {type: String},
    address: {type: String},
    gender: {type: String},
    email: {type: String, required: true, unique: true},
    avatar: {type: Buffer},
});

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    status: {type: String, required: true},
    type: {type: String},
    description: {type: String},
    images: {type: [Buffer]},
    operations: {type: [Object]},
});

export const User = mongoose.model('User', userSchema);
export const Event = mongoose.model('Event', eventSchema);

export const UserRoles = {
    selectByUsername: async (username: string) => await User.findOne({username}),
    selectById: async (id: string) => await User.findById(id),
    insert: async (userData: any) => {
        const user = new User(userData);
        return await user.save();
    },
};

export const EventRoles = {
    insert: async (eventData: any) => {
        const event = new Event(eventData);
        return await event.save();
    },
    edit: async (id: string, eventData: any) => await Event.findByIdAndUpdate(id, eventData, {new: true}),
    selectById: async (id: string) => await Event.findById(id),
    getStatus: async (id: string) => {
        const event = await Event.findById(id);
        return event ? event.status : null;
    },
    getOperations: async (id: string) => {
        const event = await Event.findById(id);
        return event ? event.operations : null;
    },
    updateStatus: async (id: string, status: string) => await Event.findByIdAndUpdate(id, {status}, {new: true}),
    updateOperations: async (id: string, operations: any) => await Event.findByIdAndUpdate(id, {operations}, {new: true}),
    selectAllOpen: async () => await Event.find({status: 'open'}),
};