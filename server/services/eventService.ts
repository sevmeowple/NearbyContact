import {EventRoles, FileRoles} from "../mongodb/mongo.ts";
import {type Event, EventState, type Operation} from "../util/types.ts";
import {EventStateMachine} from "./stateMachines/eventStateMachine.ts";

export async function createEvent(name: string, type: string, description: string, images: Buffer[], creator: number) {
    let imageIds: number[] = [];
    for (let image of images) {
        const imageId = await FileRoles.insert(image);
        if (!imageId) {
            throw Object.assign(new Error('fileNotFound'), {statusCode: 404});
        }
        imageIds.push(imageId);
    }
    const operation: Operation = {
        userId: creator,
        timestamp: Date.now(),
        after: {
            name: name,
            type: type,
            description: description,
            imageIds: imageIds
        }
    };
    await EventRoles.insert({name, type, status: 'open', description, images: imageIds, operations: [operation]});
}

export async function editEvent(eventId: number, userId: number, changes: Operation, images: Buffer[], imagesToBeDelete: number[]) {
    const event = await EventRoles.selectById(eventId.toString()) as unknown as Event;
    const stateMachine = new EventStateMachine(eventId, userId);
    stateMachine.changeContents();
    if (images) {
        for (let image of images) {
            const fileId = await FileRoles.insert(image);
            if (!fileId) {
                throw Object.assign(new Error('fileNotFound'), {statusCode: 400});
            }
            changes.after.imageIds.push(fileId);
        }
    }
    if (imagesToBeDelete) {
        for (let imageId of imagesToBeDelete) {
            await FileRoles.delete(imageId.toString());
            changes.after.imageIds = changes.after.imageIds.filter((id: number) => id !== imageId);
        }
    }
    await EventRoles.edit(eventId.toString(), {operations: event.operations});
    event.operations.push(changes);
    await EventRoles.updateOperations(eventId.toString(), event.operations);

}

export async function changeEventStatus(eventId: number, userId: number, status: EventState) {
    const stateMachine = new EventStateMachine(eventId, userId);
    stateMachine.changeStatus(status);
    await EventRoles.updateStatus(eventId.toString(), status);
}

export async function getAllOpenEvents() {
    return await EventRoles.selectAllOpen();
}