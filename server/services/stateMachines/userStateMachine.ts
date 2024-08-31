import type {IUser} from "../../util/types.ts";
import {UserRoles} from "../../mongodb/mongo.ts";
import type {ObjectId} from "mongoose";

export class UserStateMachine {
    private readonly user: IUser;
    private readonly operator: IUser;

    constructor(userId: ObjectId, operatorId: ObjectId) {
        this.user = UserRoles.selectById(userId) as unknown as IUser;
        this.operator = UserRoles.selectById(operatorId) as unknown as IUser;
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