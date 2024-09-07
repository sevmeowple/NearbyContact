import express from 'express';
import cors from 'cors';
import i18n from 'i18next';
import middleware from "i18next-http-middleware";
import cookieParser from 'cookie-parser';
import {authRoutes} from './routes/authRoutes';
import {userRoutes} from './routes/userRoutes';
import {eventRoutes} from './routes/eventRoutes.ts';
import {indexPORT, redisPORT, smtpPORT} from './config.ts'
import {fileRoutes} from "./routes/fileRoutes.ts";
import {log} from "./util/log.ts";
import {SMTPServer} from "smtp-server";
import Backend from "i18next-fs-backend";
import path from "path";
import {createClient} from "redis";

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
    });

export default i18n;

export const smtpServer = new SMTPServer({
    authOptional: true,
});

smtpServer.listen(smtpPORT, '127.0.0.1', () => {
    log('INFO', 'Private SMTP server is running on port' + smtpPORT.toString());
});

export const redisClient = createClient({
    url: `redis://127.0.0.1:${redisPORT}`
});

redisClient.on('error', (err) => log('ERROR', 'Redis Client Error' + err));

redisClient.connect();

const app = express();

app.use(middleware.handle(i18n));

// 允许所有来源的跨域请求（仅在开发环境中使用）
app.use(cors({
    origin: 'http://localhost:5173', // 假设你的前端在 3000 端口
    credentials: true, // 允许发送Cookie等凭证信息
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/events', eventRoutes);
app.use('/files', fileRoutes);

const PORT = process.env.PORT || indexPORT;
app.listen(PORT, () => {
    log('INFO', `Server is running on port ${PORT}`);
});
