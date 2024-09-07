import type {Request, Response} from "express";
import {handleWorker} from "../workers/workerHandler.ts";

import {getImage} from "../services/fileService.ts";
import i18n from "i18next";

export async function getImageHandler(req: Request, res: Response, type: 'original' | 'thumbnail') {
    try {
        const {imageId} = req.body;
        handleWorker('../workers/genericWorker.ts', {
            workerFunction: getImage,
            args: [imageId, type]
        }, req.body.language, res);
    } catch (error: any) {
        res.status(error.statusCode).json({error: i18n.t(error.message, {lng: req.body.language})});
    }
}

