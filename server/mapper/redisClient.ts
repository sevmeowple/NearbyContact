import {createClient} from 'redis';
import {redisPORT} from "../config.ts";
import {log} from "../util/log.ts";

const redisClient = createClient({
    url: `redis://127.0.0.1:${redisPORT}`
});

redisClient.on('error', (err) => log('ERROR', 'Redis Client Error'+ err));

redisClient.connect();

export const cacheSet = {
    string: async (key: string, value: any, ex: number) => redisClient.set('s' + key, value, {'EX': ex}),
    buffer: async (key: string, value: Buffer, ex: number) => redisClient.set('b' + key, value.toString('base64'), {'EX': ex}),
    json: async (key: string, value: object, ex: number) => redisClient.set('j' + key, JSON.stringify(value), {'EX': ex}),
}

export const cacheGet = {
    string: async (key: string) => {
       return redisClient.get('s' + key)
    },
    buffer: async (key: string) => {
        const value = await redisClient.get('b' + key);
        return value ? Buffer.from(value, 'base64'): null ;
    },
    json: async (key: string) => {
        const value = await redisClient.get('j' + key);
        return value ? JSON.parse(value): null;
    },
}

export const cacheClear = {
    string: (key: string) => redisClient.del('s'+key),
    buffer: (key: string) =>redisClient.del('b'+key),
    json: (key: string) => redisClient.del('j'+key),
}