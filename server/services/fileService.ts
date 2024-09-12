import { FileRoles } from '../mapper/data.ts';

export async function getImage(imageId: string, type: 'original' | 'thumbnail') {
	switch (type) {
		case 'original':
			return await FileRoles.getOriginal(imageId);
		case 'thumbnail':
			return await FileRoles.getThumbnail(imageId);
	}
}