import { Event, File, User } from './mongo.ts';
import { thumbnailRS } from '../config.ts';
import * as sharp from 'sharp';
import { addDocument, deleteDocument, searchProjectedDocument } from './elastic.ts';

export const FileRoles = {
	insert: async (image: Buffer) => {
		const thumbnail = await sharp(image).resize(thumbnailRS).toBuffer();
		const file = new File({ thumbnail: thumbnail, original: image });
		const imageId = (await file.save())._id.toString();
		await addDocument('File', imageId, { thumbnail: thumbnail, original: image });
		await addDocument('File', imageId, { thumbnail: thumbnail, original: image });
		return imageId;
	},
	getThumbnail: async (imageId: string) => {
		return await searchProjectedDocument('File', imageId, 'thumbnail') as { thumbnail: Buffer };
	},
	getOriginal: async (imageId: string) => {
		return await searchProjectedDocument('File', imageId, 'original') as { original: Buffer };
	},
	delete: async (imageId: string) => {
		await File.findByIdAndDelete(imageId);
		await deleteDocument('File', imageId);
	}
};

export const UserRoles = {
	insert: async (userData: any) => {
		const user = new User(userData);
		return (await user.save())._id.toString();
	},
	selectByUsername: async (username: string) => await User.findOne({ username }),
	selectById: async (id: string) => await User.findById(id),
	updateStatus: async (id: string, status: 'active' | 'unverified' | 'banned') => await User.findByIdAndUpdate(id, { status: status }, { new: true }),
	editProfile: async (id: string, userData: any) => await User.findByIdAndUpdate(id, userData, { new: true }),
	appendCreatedEvents: async (id: string, eventId: string) => await User.findByIdAndUpdate(id, { $push: { createdEvents: eventId } }, { new: true }),
	appendTakenEvents: async (id: string, eventId: string) => await User.findByIdAndUpdate(id, { $push: { takenEvents: eventId } }, { new: true }),
	appendFinishedEvents: async (id: string, eventId: string) => await User.findByIdAndUpdate(id, { $push: { finishedEvents: eventId } }, { new: true })
};

export const EventRoles = {
	insert: async (eventData: any) => {
		const event = new Event(eventData);
		return (await event.save())._id.toString();
	},
	edit: async (id: string, eventData: any) => await Event.findByIdAndUpdate(id, eventData, { new: true }),
	selectById: async (id: string) => await Event.findById(id),
	updateStatus: async (id: string, status: string) => await Event.findByIdAndUpdate(id, { status }, { new: true }),
	updateOperations: async (id: string, operations: any) => await Event.findByIdAndUpdate(id, { operations }, { new: true }),
	selectAllOpen: async () => await Event.find({ status: 'open' }, 'name type timestamp')
};