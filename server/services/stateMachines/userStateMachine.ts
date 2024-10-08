import type { IUser } from '../../util/types.ts';
import { UserRoles } from '../../mapper/data.ts';

export class UserStateMachine {
	private readonly user: IUser;
	private readonly operator: IUser;

	constructor(userId: string, operatorId: string) {
		this.user = UserRoles.selectById(userId) as unknown as IUser;
		this.operator = UserRoles.selectById(operatorId) as unknown as IUser;
	}

	public editProfile() {
		if (this.operator.role === 'admin') {
			return;
		}
		if (this.user.id !== this.operator.id) {
			throw Object.assign(new Error('cannotEditOthersProfile'), { statusCode: 400 });
		}
		switch (this.operator.status) {
			case 'active':
				break;
			case 'unverified':
				throw Object.assign(new Error('unverifiedUser'), { statusCode: 400 });
			case 'banned':
				throw Object.assign(new Error('bannedUser'), { statusCode: 400 });
		}
	}
}