import type {NextFunction, Request, Response} from "express";
import {cacheGet, cacheSet} from "../mapper/redisClient.ts";
import {hashEX} from "../config.ts";

export async function antiShakeMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const {hash} = req.body;
        if (!hash) {
            throw new Error('invalidRequest');
        }
        if (await cacheGet.hash(hash)) {
            throw new Error('doNotSubmitAgain');
        }
        cacheSet.hash(hash, hashEX);
        next();
    } catch (error: any) {
        res.status(403).json({error: error.message});
    }
}