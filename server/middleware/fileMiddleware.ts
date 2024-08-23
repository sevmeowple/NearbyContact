import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {image} from "../config.ts";

const storage = multer.diskStorage({
    destination: image.destination,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: image.maxSize}, // Limit file size to 1MB
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

export {upload};

export function deleteImage(imagePath: string) {
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(`Error deleting image: ${imagePath}`, err);
        } else {
            console.log(`Deleted ${imagePath}`);
        }
    });
}