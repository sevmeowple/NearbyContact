import { events } from "./stores/eventStore";
import type { Event } from "./stores/eventStore";

//分割description字符串，返回一个对象
function parseDescription(description: string) {
    const lines = description.trim().split('\n');
    const result: { [key: string]: string } = {};
    
    lines.forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        if (key && value) {
            result[key] = value;
        }
    });

    return result;
}

function selectEvents(selectedOpt:string,events: Event[]): Event[] {
    if(selectedOpt === '全部'){
        return events;
    }
    else{
        return events.filter(event => event.type === selectedOpt);
    }
}

function sortEvents(selectedOpt:string,selectedSubOpt:string,events: Event[]): Event[] {
    const selectedEvents = selectEvents(selectedOpt,events);
    if(selectedSubOpt === 'time-order'){
        return selectedEvents.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
        });
    }
    else if(selectedSubOpt === 'distance-order'){
        return selectedEvents.sort((a, b) => a.distance - b.distance);
    }
    else if (selectedSubOpt === 'price-order'){
        return selectedEvents.sort((a, b) => a.fee - b.fee);
    }
    else{
        return selectedEvents;
    }
}

export { parseDescription, selectEvents, sortEvents };
