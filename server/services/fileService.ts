import {FileRoles} from "../mapper/mongodb/mongo.ts";
import type {ObjectId} from "mongoose";

export async function getImage(imageId: ObjectId, type: 'original' | 'thumbnail') {
    switch (type) {
        case "original":
            return await FileRoles.selectOriginalById(imageId);
        case "thumbnail":
            return await FileRoles.selectThumbnailById(imageId);
    }
}