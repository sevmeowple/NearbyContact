import { writable } from 'svelte/store';

// 复制之前apits的register的body
interface User {
	'username': string;
	'password': string;
	'phone_number'?: string;
	'QQ'?: string;
	'address'?: string;
	'gender'?: 'M' | 'F';
	'email': string;
	'avatar'?: File;
}

const user: User = {
	'username': '',
	'password': '',
	'email': ''
};


const { subscribe, set, update } = writable(user);

const userStore = {
	subscribe,
	set,
	update,
	updateUser: (newUser: User) => set(newUser),
	modifyUser: (modifications: Partial<User>) => update(currentUser => ({ ...currentUser, ...modifications }))
};

export { userStore };
export type { User };