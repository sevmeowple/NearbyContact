import express from 'express';
import cors from 'cors';
import i18n from 'i18next';
import middleware from 'i18next-http-middleware';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { eventRoutes } from './routes/eventRoutes.ts';
import { elasticPORT, indexPORT, mongoPORT } from './config.ts';
import { fileRoutes } from './routes/fileRoutes.ts';
import { log } from './util/log.ts';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { antiShakeMiddleware } from './middleware/antiShakeMiddleware.ts';
import { errorMiddleware } from './middleware/errorMiddleware.ts';
import Docker from 'dockerode';
import { Client } from '@elastic/elasticsearch';

log('INFO', 'Initializing containers');

const docker = new Docker();

async function startContainer(image: string, containerName: string, ports: { [key: string]: string }) {
	await docker.pull(image, {});

	const container = await docker.createContainer({
		Image: image,
		name: containerName,
		HostConfig: {
			PortBindings: ports
		}
	});
	await container.start();
}

startContainer('docker.elastic.co/elasticsearch/elasticsearch:latest', 'elastic-server', { '10001/tcp': elasticPORT.toString() })
	.then(() => log('INFO', 'Elasticsearch container started'))
	.catch((err: any) => log('ERROR', 'Failed to start Elasticsearch container: ' + err));

startContainer('mongo:latest', 'mongo-server', { '10002/tcp': mongoPORT.toString() })
	.then(() => log('INFO', 'Mongo container started'))
	.catch((err: any) => log('ERROR', 'Failed to start Mongo container' + err));

log('INFO', 'Initializing i18n');

i18n
	.use(Backend)
	.use(middleware.LanguageDetector)
	.init({
		backend: {
			loadPath: path.join(__dirname, 'locales/{{lng}}.json')
		},
		fallbackLng: 'en',
		preload: ['en', 'zh'],
		defaultNS: 'translation',
		detection: {
			order: ['querystring', 'cookie'],
			caches: ['cookie']
		}
	}).then(() => {
	log('INFO', 'i18n initialized');
})
	.catch((err) => {
		log('WARN', 'i18n initialization failed' + err);
	});

export { i18n };

log('INFO', 'Initializing ElasticSearch client');

const client = new Client({ node: `http://127.0.0.1:${elasticPORT}` });

client.indices.create({
	index: 'File',
	mappings: {
		properties: {
			thumbnail: { type: 'binary' },
			original: { type: 'binary' }
		}
	}
})
	.then(() => log('INFO', 'Index created'))
	.catch((err: any) => log('ERROR', 'Failed to create index: ' + err));

client.indices.create({
	index: 'Offer',
	mappings: {
		properties: {
			name: { type: 'text' },
			description: { type: 'text' }
		}
	}
})
	.then(() => log('INFO', 'Index created'))
	.catch((err: any) => log('ERROR', 'Failed to create index: ' + err));

client.indices.create({
	index: 'Commission',
	mappings: {
		properties: {
			name: { type: 'text' },
			description: { type: 'text' }
		}
	}
})
	.then(() => log('INFO', 'Index created'))
	.catch((err: any) => log('ERROR', 'Failed to create index: ' + err));

client.ilm.putLifecycle({
	name: 'delete-after-10-min',
	policy: {
		phases: {
			delete: {
				min_age: '10m',
				actions: {
					delete: {}
				}
			}
		}
	}
})
	.then(() =>{
	client.indices.create({
		index: '10min',
		settings: {
			'index.lifecycle.name': 'delete-after-10-min',
			'index.lifecycle.rollover_alias': '10min',
		},
		mappings: {
			properties: {
				value: {type: 'text'}
			}
		}
	}).then(() => log('INFO', '10minEX created'))
})
	.catch((err: any) => log('ERROR', 'Failed to create 10minEX: ' + err));

export { client };

log('INFO', 'Initializing Express server');

const app = express();

app.use(antiShakeMiddleware);
app.use(middleware.handle(i18n));

// 允许所有来源的跨域请求（仅在开发环境中使用）
app.use(cors({
	origin: `http://localhost:${indexPORT}`, // 假设你的前端在 3000 端口
	credentials: true // 允许发送Cookie等凭证信息
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/events', eventRoutes);
app.use('/files', fileRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || indexPORT;
app.listen(PORT, () => {
	log('INFO', `Server is running on port ${PORT}`);
});
