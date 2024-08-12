import { writable } from 'svelte/store';

interface User {
    "username": string;
    "email": string;
    "password": string;
}

const user: User = {
    "username": '',
    "email": '',
    "password": ''
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