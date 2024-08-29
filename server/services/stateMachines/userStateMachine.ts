import type {User} from "../../util/types.ts";
import {UserRoles} from "../../mongodb/mongo.ts";
import type {ObjectId} from "mongoose";

export class UserStateMachine {
    private readonly user: User;
    private readonly operator: User;

    constructor(userId: ObjectId, operateorId: ObjectId) {
        this.user = UserRoles.selectById(userId) as unknown as User;
        this.operator = UserRoles.selectById(operateorId) as unknown as User;
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