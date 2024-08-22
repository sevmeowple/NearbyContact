import type {Event} from "../database";
import {EventRoles} from "../database";

export async function createEvent(name: string, type: string, description: string, imagePaths: string[]) {
    const imagePathsJson = JSON.stringify(imagePaths)
    EventRoles.insert.run(name, type, Date.now(), 'open', description, imagePathsJson);
    return {name: name, status: 'open'};
}

export async function takeEvent(eventId: number) {
    EventRoles.updateStatus.run('taken', eventId);
    return {id: eventId, status: "taken"};
}

export async function closeEvent(eventId: number) {
    EventRoles.updateStatus.run('closed', eventId);
    return {id: eventId, status: 'closed'};
}

export async function reOpenEvent(eventId: number) {
    EventRoles.updateStatus.run(true, eventId);
    return {id: eventId, status: 'open'};
}

export async function selectAllOpenEvent() {
    const events = EventRoles.selectAllOpen.all() as Event[];
    events.forEach(event => {
        event.imagePaths = JSON.parse(<string>event.imagePaths)
    });
    return events;
}