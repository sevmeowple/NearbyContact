import {type Event, eventFromJSON, type EventJSON, EventState, type Operation, type User} from "../../types.ts";
import {EventRoles, UserRoles} from "../../database.ts";

export class EventStateMachine {
    private readonly event: Event;
    private readonly operator: User;

    constructor(eventId: number, userId: number) {
        this.event = eventFromJSON(EventRoles.selectById.get(eventId) as EventJSON);
        this.operator = UserRoles.selectById.get(userId) as User;
    }

    public changeStatus(targetState: EventState) {
        if (this.operator.role === 'admin') {
            return;
        }
        switch (this.event.status) {
            case EventState.Open:
                switch (targetState) {
                    case EventState.Open:
                        throw new Error('cannotSwitchToSameState');
                    case EventState.Taken:
                        if (this.event.operations[0].userId === this.operator.id) {
                            throw new Error('cannotTakeSelfEvent');
                        }
                        break;
                    case EventState.Closed:
                        if (this.event.operations[0].userId !== this.operator.id) {
                            throw new Error('cannotCloseOthersEvent');
                        }
                        break;
                }
                break;
            case EventState.Taken:
                switch (targetState) {
                    case EventState.Open:
                        if (this.event.operations[length - 1].userId !== this.operator.id) {
                            throw new Error('cannotReleaseEventTakenByOther');
                        }
                        break;
                    case EventState.Taken:
                        throw new Error('cannotSwitchToSameState');
                    case EventState.Closed:
                        throw new Error('cannotCloseTakenEvent');
                }
                break;
            case EventState.Closed:
                switch (targetState) {
                    case EventState.Open:
                        if (this.event.operations[0].userId !== this.operator.id) {
                            throw new Error('cannotReopenOthersEvent');
                        }
                        break;
                    case EventState.Taken:
                        throw new Error('cannotTakeClosedEvent');
                    case EventState.Closed:
                        throw new Error('cannotSwitchToSameState');
                }
                break;
        }
    }

    public changeContents(changes: Operation) {
        if (this.operator.role === 'admin') {
            return;
        }
        if (this.event.operations[0].userId !== this.operator.id) {
            throw new Error('cannotEditOthersEvent');
        }
    }
}