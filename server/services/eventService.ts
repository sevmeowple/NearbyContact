import type {Event, Operation} from "../database";
import {EventRoles} from "../database";

async function appendOperations(eventId: number, operation: Operation) {
    const operations = EventRoles.getOperations.get(eventId) as Operation[];
    operations.push(operation);
    EventRoles.updateOperations.run(JSON.stringify(operations), eventId);
}

export async function createEvent(name: string, type: string, description: string, imagePaths: string[], creator: number) {
    const imagePathsJson = JSON.stringify(imagePaths)
    EventRoles.insert.run(name, type, Date.now(), 'open', description, imagePathsJson, JSON.stringify({
        userId: creator,
        type: 'create',
        timestamp: Date.now()
    }));
    return {name: name, status: 'open'};
}

export async function takeEvent(eventId: number, userId: number) {
    EventRoles.updateStatus.run('taken', eventId);
    await appendOperations(eventId, {userId, type: 'take', timestamp: Date.now()});
    return {id: eventId, status: "taken"};
}

export async function cancelTakeEvent(eventId: number, userId: number) {
    EventRoles.updateStatus.run('open', eventId);
    await appendOperations(eventId, {userId, type: 'cancelTake', timestamp: Date.now()});
    return {id: eventId, status: 'open'};
}

export async function closeEvent(eventId: number, userId: number) {
    EventRoles.updateStatus.run('closed', eventId);
    await appendOperations(eventId, {userId, type: 'close', timestamp: Date.now()});
    return {id: eventId, status: 'closed'};
}

export async function reOpenEvent(eventId: number, userId: number) {
    EventRoles.updateStatus.run(true, eventId);
    await appendOperations(eventId, {userId, type: 'reopen', timestamp: Date.now()});
    return {id: eventId, status: 'open'};
}

export async function selectAllOpenEvent() {
    const events = EventRoles.selectAllOpen.all() as Event[];
    events.forEach(event => {
        event.imagePaths = JSON.parse(<string>event.imagePaths)
    });
    return events;
}