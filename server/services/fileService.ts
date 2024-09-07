import {FileRoles} from "../mapper/data.ts";
import type {ObjectId} from "mongoose";

export async function getImage(imageId: string, type: 'original' | 'thumbnail') {
    switch (type) {
        case "original":
            return await FileRoles.getOriginal(imageId);
        case "thumbnail":
            return await FileRoles.getThumbnail(imageId);
    }
}