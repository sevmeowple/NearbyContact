import {EventRoles} from "../database";
import type {Event} from "../database";

export async function createEvent(name: string, date: string, type: string | null, description: string | null, imagePaths: string[]) {
    const imagePathsJson = JSON.stringify(imagePaths)
    EventRoles.insert.run(name, type, date, true, description, imagePathsJson);
    return {name, date, status: 'open'};
}

export async function closeEvent(eventId: number) {
    EventRoles.updateStatus.run(false, eventId);
    return {id: eventId, status: 'closed'};
}

export async function reOpenEvent(eventId: number) {
    EventRoles.updateStatus.run(true, eventId);
    return {id: eventId, status: 'open'};
}

export async function selectAllOpenEvent() {
    const events = EventRoles.selectAllOpen.all() as Event[];
    events.forEach(event => {event.imagePaths=JSON.parse(<string>event.imagePaths)});
    return events;
}