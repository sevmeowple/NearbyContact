import type {User} from "../../util/types.ts";
import {UserRoles} from "../../mongodb/mongo.ts";

export class UserStateMachine {
    private readonly user: User;
    private readonly operator: User;

    constructor(userId: number, operateorId: number) {
        this.user = UserRoles.selectById(userId.toString()) as unknown as User;
        this.operator = UserRoles.selectById(operateorId.toString()) as unknown as User;
    }

    public editProfile() {
        if (this.operator.role === 'admin') {
            return;
        }
        if (this.user.id !== this.operator.id) {
            throw Object.assign(new Error('cannotEditOthersProfile'), {statusCode: 400});
        }
    }
}