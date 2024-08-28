import {type Event, EventState, type User} from "../../types.ts";
import {EventRoles, UserRoles} from "../../mongodb/mongo.ts";

export class EventStateMachine {
    private readonly event: Event;
    private readonly operator: User;

    constructor(eventId: number, userId: number) {
        this.event = EventRoles.selectById(eventId.toString()) as unknown as Event;
        this.operator = UserRoles.selectById(userId.toString()) as unknown as User;
    }

    public changeStatus(targetState: EventState) {
        if (this.operator.role === 'admin') {
            return;
        }
        switch (this.event.status) {
            case EventState.Open:
                switch (targetState) {
                    case EventState.Open:
                        throw Object.assign(new Error('cannotSwitchToSameState'), {statusCode: 400});
                    case EventState.Taken:
                        if (this.event.operations[0].userId === this.operator.id) {
                            throw Object.assign(new Error('cannotTakeSelfEvent'), {statusCode: 400});
                        }
                        break;
                    case EventState.Closed:
                        if (this.event.operations[0].userId !== this.operator.id) {
                            throw Object.assign(new Error('cannotCloseOthersEvent'), {statusCode: 400});
                        }
                        break;
                }
                break;
            case EventState.Taken:
                switch (targetState) {
                    case EventState.Open:
                        if (this.event.operations[length - 1].userId !== this.operator.id) {
                            throw Object.assign(new Error('cannotReleaseEventTakenByOther'), {statusCode: 400});
                        }
                        break;
                    case EventState.Taken:
                        throw Object.assign(new Error('cannotSwitchToSameState'), {statusCode: 400});
                    case EventState.Closed:
                        throw Object.assign(new Error('cannotCloseTakenEvent'), {statusCode: 400});
                }
                break;
            case EventState.Closed:
                switch (targetState) {
                    case EventState.Open:
                        if (this.event.operations[0].userId !== this.operator.id) {
                            throw Object.assign(new Error('cannotReopenOthersEvent'), {statusCode: 400});
                        }
                        break;
                    case EventState.Taken:
                        throw Object.assign(new Error('cannotTakeClosedEvent'), {statusCode: 400});
                    case EventState.Closed:
                        throw Object.assign(new Error('cannotSwitchToSameState'), {statusCode: 400});
                }
                break;
        }
    }

    public changeContents() {
        if (this.operator.role === 'admin') {
            return;
        }
        if (this.event.operations[0].userId !== this.operator.id) {
            throw Object.assign(new Error('cannotEditOthersEvent'), {statusCode: 400});
        }
    }
}