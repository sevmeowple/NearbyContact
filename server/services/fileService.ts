// `server/services/fileService.ts`
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {image} from '../config';
import type {Request, Response} from 'express';

const storage = multer.diskStorage({
    destination: image.destination,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: image.maxSize},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).array('images', image.maxNumber);

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const extname = image.types.test(path.extname(file.originalname).toLowerCase());
    const mimetype = image.types.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('notImage'));
    }
}

export async function uploadFiles(req: Request, res: Response, callback: (err: any) => void) {
    upload(req, res, callback);
}

export async function deleteFile(filePath: string) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        } else {
            console.log(`Successfully deleted file: ${filePath}`);
        }
    });
}