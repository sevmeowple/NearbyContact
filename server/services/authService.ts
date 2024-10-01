import { FileRoles, UserRoles } from '../mapper/data.ts';
import { UserStateMachine } from './stateMachines/userStateMachine';

export async function editProfile(userId: string, operatorId: string, changes: any, avatar: Buffer) {
	const stateMachine = new UserStateMachine(userId, operatorId);
	stateMachine.editProfile();
	if (avatar) {
		await FileRoles.delete(((await UserRoles.selectById(userId))?.avatar as unknown as string));
		changes.avatar = await FileRoles.insert(avatar);
	}
	await UserRoles.editProfile(userId, changes);
	return { body: 'profileEdited' };
}

export async function getSpecificProfile(userId: string) {
	return { body: (await UserRoles.selectById(userId)) };
}