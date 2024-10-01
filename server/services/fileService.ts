import { FileRoles } from '../mapper/data.ts';

export async function getImage(imageId: string, type: 'original' | 'thumbnail') {
	switch (type) {
		case 'original':
			return { file: (await FileRoles.getOriginal(imageId)) };
		case 'thumbnail':
			return { file: (await FileRoles.getThumbnail(imageId)) };
	}
}