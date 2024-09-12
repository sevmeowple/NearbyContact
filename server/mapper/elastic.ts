import { client } from '../index.ts';

export async function addDocument(index: string, id: string, document: object) {
	await client.index({
		index,
		id,
		document
	});
}

export async function searchDocument(index: string, id: string) {
	return (await client.get({
		index,
		id
	}))._source;
}

export async function searchProjectedDocument(index: string, id: string, projection: string) {
	return (await client.get({
		index,
		id,
		_source: projection
	}))._source;
}

export async function deleteDocument(index: string, id: string) {
	await client.delete({
		index,
		id
	});
}