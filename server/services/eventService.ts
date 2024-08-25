import {EventRoles} from "../mongodb/database.ts";
import {EventState, type Operation} from "../types.ts";

async function appendOperations(eventId: number, operation: Operation) {
    const operations = await EventRoles.getOperations(eventId.toString());
    operations.push(operation);
    await EventRoles.updateOperations(eventId.toString(), JSON.stringify(operations));
}

export async function createEvent(name: string, type: string, description: string, imagePaths: string[], creator: number) {
    const imagePathsJson = JSON.stringify(imagePaths);
    const operation: Operation = {
        userId: creator,
        timestamp: Date.now(),
        after: {
            name: name,
            type: type,
            description: description,
            imagePaths: imagePathsJson
        }
    };
    await EventRoles.insert({ name, type, status: 'open', description, images: imagePathsJson, operations: [operation] });
}

export async function editEvent(eventId: number, userId: number, change: Operation) {
    await EventRoles.edit(eventId.toString(), { name: change.after.name, type: change.after.type, description: change.after.description, images: JSON.stringify(change.after.imagePaths) });
    await appendOperations(eventId, change);
}

export async function changeEventStatus(eventId: number, userId: number, status: EventState) {
    await EventRoles.updateStatus(eventId.toString(), status);
    const operation: Operation = {
        userId: userId,
        timestamp: Date.now(),
        after: {
            status: status
        }
    };
    await appendOperations(eventId, operation);
}

export async function selectAllOpenEvent() {
    return await EventRoles.selectAllOpen();
}