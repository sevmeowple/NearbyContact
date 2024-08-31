import {EventRoles, FileRoles} from "../mongodb/mongo.ts";
import type {IEvent, EventState, IOperation} from "../util/types.ts";
import {EventStateMachine} from "./stateMachines/eventStateMachine.ts";
import type {ObjectId} from "mongoose";

export async function createEvent(name: string, type: string, description: string, images: Buffer[], creator: number) {
    let imageIds: ObjectId[] = [];
    for (let image of images) {
        const imageId = await FileRoles.insert(image);
        if (!imageId) {
            throw Object.assign(new Error('fileNotFound'), {statusCode: 404});
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
    await EventRoles.insert({name, type, status: 'open', description, images: imageIds, operations: [operation]});
}

export async function editEvent(eventId: ObjectId, userId: ObjectId, changes: IOperation, images: Buffer[], imagesToBeDelete: ObjectId[]) {
    const event = await EventRoles.selectById(eventId) as unknown as IEvent;
    const stateMachine = new EventStateMachine(eventId, userId);
    stateMachine.changeContents();
    if (images) {
        for (let image of images) {
            const fileId: ObjectId = await FileRoles.insert(image);
            if (!fileId) {
                throw Object.assign(new Error('fileNotFound'), {statusCode: 400});
            }
            changes.after.imageIds.push(fileId);
        }
    }
    if (imagesToBeDelete) {
        for (let imageId of imagesToBeDelete) {
            await FileRoles.delete(imageId);
            changes.after.imageIds = changes.after.imageIds.filter((id: ObjectId) => id !== imageId);
        }
    }
    await EventRoles.edit(eventId, {operations: event.operations});
    event.operations.push(changes);
    await EventRoles.updateOperations(eventId, event.operations);

}

export async function changeEventStatus(eventId: ObjectId, userId: ObjectId, status: EventState) {
    const stateMachine = new EventStateMachine(eventId, userId);
    stateMachine.changeStatus(status);
    await EventRoles.updateStatus(eventId, status);
}

export async function getAllOpenEvents() {
    return await EventRoles.selectAllOpen();
}

export async function getSpecificEvent(eventId: ObjectId) {
    return await EventRoles.selectById(eventId);
}