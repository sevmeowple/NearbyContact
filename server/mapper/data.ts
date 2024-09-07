import {File, User, Event} from "./mongo.ts";
import {originalEX, thumbnailEX, thumbnailRS} from "../config.ts";
import {cacheClear, cacheGet, cacheSet} from "./redisClient.ts";
import * as sharp from "sharp";
import type {ObjectId} from "mongoose";

export const FileRoles = {
    insert: async (image: Buffer) => {
        const thumbnail = await sharp(image).resize(thumbnailRS).toBuffer();
        const file = new File({thumbnail: thumbnail, original: image});
        const imageId = (await file.save())._id.toString();
        await cacheSet.buffer('t' + imageId.toString(), thumbnail, thumbnailEX);
        await cacheSet.buffer('o' + imageId.toString(), image, originalEX);
        return imageId;
    },
    getThumbnail: async (imageId: string) => {
        const thumbnail = await cacheGet.buffer('t' + imageId) as Buffer;
        return thumbnail ? thumbnail : async () => {
            const thumbnail = (await File.findById(imageId, 'thumbnail'))?.thumbnail as Buffer;
            await cacheSet.buffer('t' + imageId, thumbnail, thumbnailEX);
            return thumbnail;
        }
        },
    getOriginal: async (imageId: string) => {
        const original = await cacheGet.buffer('o' + imageId) as Buffer;
        return original ? original : async () => {
            const original = (await File.findById(imageId, 'original'))?.original as Buffer;
            await cacheSet.buffer('o' + imageId, original, originalEX);
            return original;
        }
    },
    delete: async (imageId: string) => {
        await File.findByIdAndDelete(imageId);
        await cacheClear.buffer('t' + imageId);
        await cacheClear.buffer('o' + imageId);
    }
}

export const UserRoles = {
    insert: async (userData: any) => {
        const user = new User(userData);
        return (await user.save())._id.toString();
    },
    selectByUsername: async (username: string) => await User.findOne({username}),
    selectById: async (id: string) => await User.findById(id),
    updateStatus: async (id: string, status: 'active' | 'unverified' | 'banned') => await User.findByIdAndUpdate(id, {status: status}, {new: true}),
    editProfile: async (id: string, userData: any) => await User.findByIdAndUpdate(id, userData, {new: true}),
};

export const EventRoles = {
    insert: async (eventData: any) => {
        const event = new Event(eventData);
        return (await event.save())._id.toString();
    },
    edit: async (id: string, eventData: any) => await Event.findByIdAndUpdate(id, eventData, {new: true}),
    selectById: async (id: string) => await Event.findById(id),
    updateStatus: async (id: string, status: string) => await Event.findByIdAndUpdate(id, {status}, {new: true}),
    updateOperations: async (id: string, operations: any) => await Event.findByIdAndUpdate(id, {operations}, {new: true}),
    selectAllOpen: async () => await Event.find({status: 'open'}, 'name type timestamp'),
};