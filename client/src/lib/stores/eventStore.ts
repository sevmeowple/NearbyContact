import { writable } from 'svelte/store';
import { getAllOpen } from '../api';
import type { AxiosResponse } from 'axios';

// 定义事件的接口
interface Event {
	id: string;
	name: string;
	date: string;
	distance: number;
	fee: number;
	type: string;
	description: string;
}

// 初始化一个空的事件组
const events: Event[] = [];

// 创建一个可写的store
const { subscribe, set, update } = writable(events);

// 定义事件组的store
const eventStore = {
	subscribe,
	set,
	update,
	// 添加一个新事件
	addEvent: (newEvent: Event) => update(currentEvents => [...currentEvents, newEvent]),
	// 更新一个事件
	updateEvent: (eventId: string, modifications: Partial<Event>) => update(currentEvents =>
		currentEvents.map(event =>
			event.id === eventId ? { ...event, ...modifications } : event
		)
	),
	// 删除一个事件
	deleteEvent: (eventId: string) => update(currentEvents =>
		currentEvents.filter(event => event.id !== eventId)
	),

	// 初始化事件组获取所有事件
	fetchAllEvents: async () => {
		const response: AxiosResponse<Event[]> = await getAllOpen();
		const allEvents: Event[] = response.data;
		update(() => allEvents);
	}
};

export { eventStore,events };
export type { Event };
