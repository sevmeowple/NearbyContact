import {EventRoles} from "../database";

export async function createEvent(name: string, type: string, date: string, description: string, imagePath: string | null ) {
    EventRoles.insert.run(name, type, date, true, description, imagePath);
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
    return EventRoles.selectAllOpen.all();
}