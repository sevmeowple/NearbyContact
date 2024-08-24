import {EventRoles} from "../../database.ts";
import {EventState, type Operation, type User} from "../../types.ts";

async function getOperation(eventId: number, step: number) {
    const JSONOperations = EventRoles.getOperations.get(eventId) as string;
    const operations = JSON.parse(JSONOperations) as Operation[];
    const length = operations.length
    return operations[(step % length + length) % length];
}

export class EventStateMachine {
    private currentState: EventState;
    private readonly historyOperations: Operation[];
    private readonly operator: User;

    constructor(initialState: EventState, historyOperations: Operation[], operator: User) {
        this.currentState = initialState;
        this.historyOperations = historyOperations;
        this.operator = operator;
    }

    public getState(): EventState {
        return this.currentState;
    }

    public transitionTo(targetState: EventState): void {
        if (targetState === this.currentState) {
            throw new Error('cannotSwitchToSameState');
        }
        switch (this.currentState) {
            case EventState.Open:
                break;
            case EventState.Taken:
                break;
            case EventState.Closed:
                break;
            case EventState.Hidden:
                break;
        }
    }
}