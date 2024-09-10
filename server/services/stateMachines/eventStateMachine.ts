import type {IEvent, IUser} from "../../util/types.ts";
import {EventRoles, UserRoles} from "../../mapper/data.ts";

export class EventStateMachine {
    private readonly event: IEvent;
    private readonly operator: IUser;

    constructor(eventId: string, userId: string) {
        this.event = EventRoles.selectById(eventId) as unknown as IEvent;
        this.operator = UserRoles.selectById(userId) as unknown as IUser;
    }

    public changeStatus(targetState: 'open' | 'taken' | 'closed') {
        if (this.operator.role === 'admin') {
            return;
        }
        if (Date.now() - this.event.operations[length-1].timestamp < 60) {
            throw Object.assign(new Error('cannotSwitchStateTooFast'), {statusCode: 400});
        }
        switch (this.event.status) {
            case 'open':
                switch (targetState) {
                    case 'open':
                        throw Object.assign(new Error('cannotSwitchToSameState'), {statusCode: 400});
                    case 'taken':
                        if (this.event.operations[0].userId === this.operator.id) {
                            throw Object.assign(new Error('cannotTakeSelfEvent'), {statusCode: 400});
                        }
                        UserRoles.appendTakenEvents(this.operator.id, this.event.id);
                        break;
                    case 'closed':
                        if (this.event.operations[0].userId !== this.operator.id) {
                            throw Object.assign(new Error('cannotCloseOthersEvent'), {statusCode: 400});
                        }
                        break;
                }
                break;
            case 'taken':
                switch (targetState) {
                    case 'open':
                        if (this.event.operations[length - 1].userId !== this.operator.id) {
                            throw Object.assign(new Error('cannotReleaseEventTakenByOther'), {statusCode: 400});
                        }
                        break;
                    case 'taken':
                        throw Object.assign(new Error('cannotSwitchToSameState'), {statusCode: 400});
                    case 'closed':
                        throw Object.assign(new Error('cannotCloseTakenEvent'), {statusCode: 400});
                }
                break;
            case 'closed':
                switch (targetState) {
                    case 'open':
                        if (this.event.operations[0].userId !== this.operator.id) {
                            throw Object.assign(new Error('cannotReopenOthersEvent'), {statusCode: 400});
                        }
                        break;
                    case 'taken':
                        if (this.event.operations[0].userId !== this.operator.id && this.event.operations[length - 1].userId === this.operator.id) {
                            throw Object.assign(new Error('cannotTakeOthersEvent'), {statusCode: 400});
                        }
                        break;
                    case 'closed':
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