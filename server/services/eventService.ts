import { EventRoles, FileRoles, UserRoles } from '../mapper/data.ts';
import type { IOffer, IOperation } from '../util/types.ts';
import { EventStateMachine } from './stateMachines/eventStateMachine.ts';

export async function createEvent(name: string, type: string, description: string, images: Buffer[], creator: string) {
	let imageIds: string[] = [];
	for (let image of images) {
		const imageId = await FileRoles.insert(image);
		if (!imageId) {
			throw Object.assign(new Error('fileNotFound'), { statusCode: 404 });
		}
		imageIds.push(imageId);
	}
	const operation: IOperation = {
		userId: creator,
		timestamp: Date.now(),
		after: {
			name: name,
			type: type,
			description: description,
			imageIds: imageIds
		}
	};
	const event = {
		name: name,
		type: type,
		status: 'open',
		description: description,
		imageIds: imageIds,
		operations: [operation]
	};
	const eventId = await EventRoles.insert(event);
	await UserRoles.appendCreatedEvents(creator, eventId);
	return { body: event };
}

export async function editEvent(eventId: string, userId: string, changes: any, images: Buffer[]) {
	const event = await EventRoles.selectById(eventId) as unknown as IOffer;
	const stateMachine = new EventStateMachine(eventId, userId);
	stateMachine.changeContents();
	if (images) {
		let imageIds: string[] = [];
		for (let imageId of event.imageIds) {
			await FileRoles.delete(imageId);
		}
		for (let image of images) {
			const imageId = await FileRoles.insert(image);
			if (!imageId) {
				throw Object.assign(new Error('fileNotFound'), { statusCode: 404 });
			}
			imageIds.push(imageId);
		}
		changes.imageIds = imageIds;
	}
	await EventRoles.edit(eventId, changes);
	const operation: IOperation = {
		userId: userId,
		timestamp: Date.now(),
		after: changes
	};
	event.operations.push(operation);
	await EventRoles.updateOperations(eventId, event.operations);
	return { body: 'eventEdited' };
}

export async function changeEventStatus(eventId: string, userId: string, status: 'open' | 'taken' | 'closed') {
	const stateMachine = new EventStateMachine(eventId, userId);
	stateMachine.changeStatus(status);
	await EventRoles.updateStatus(eventId, status);
	return { body: 'eventStatusChanged' };
}

export async function getSpecificEvent(eventId: string) {
	return { body: (await EventRoles.selectById(eventId)) };
}