import multer from 'multer';
import path from 'path';
import {image} from "../config.ts";

// Set storage engine
const storage = multer.diskStorage({
    destination: image.destination,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: {fileSize: image.maxSize}, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).array('images', image.maxNumber);

// Check file type
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const extname = image.types.test(path.extname(file.originalname).toLowerCase());
    const mimetype = image.types.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Images only!'));
    }
}

export {upload};