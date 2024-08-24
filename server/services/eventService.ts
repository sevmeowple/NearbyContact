import {EventRoles} from "../database";

import {eventFromJSON, type EventJSON, EventState, type Operation} from "../types.ts";
import {EventStateMachine} from "./stateMachines/eventStateMachine.ts";

async function appendOperations(eventId: number, operation: Operation) {
    const operations = EventRoles.getOperations.get(eventId) as Operation[];
    operations.push(operation);
    EventRoles.updateOperations.run(JSON.stringify(operations), eventId);
}

export async function createEvent(name: string, type: string, description: string, imagePaths: string[], creator: number) {
    const imagePathsJson = JSON.stringify(imagePaths)
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
    EventRoles.insert.run(name, type, 'open', description, imagePathsJson, JSON.stringify(operation));
}

export async function editEvent(eventId: number, userId: number, change: Operation) {
    const eventStateMachine = new EventStateMachine(eventId, userId);
    eventStateMachine.changeContents(change);
    EventRoles.edit.run(change.after.name, change.after.type, change.after.description, JSON.stringify(change.after.imagePaths), eventId);
    await appendOperations(eventId, change);
}

export async function changeEventStatus(eventId: number, userId: number, status: EventState) {
    const eventStateMachine = new EventStateMachine(eventId, userId);
    eventStateMachine.changeStatus(status);
    EventRoles.updateStatus.run(status, eventId);
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
    const events = EventRoles.selectAllOpen.all() as EventJSON[];
    return events.forEach(event => eventFromJSON(event));
}