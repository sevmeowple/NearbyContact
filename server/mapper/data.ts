import redisClient from "../util/redisClient.ts";

export async function setCacheToken(key: string, value: string) {
    await redisClient.set(key, value, {'EX': 60 * 5});
}

export async function getCacheToken(key: string) {
    return await redisClient.get(key);
}

export async function clearCacheToken(key: string) {
    await redisClient.del(key);
}