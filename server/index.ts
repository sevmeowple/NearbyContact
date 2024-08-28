import express from 'express';
import cors from 'cors';
import i18n from './util/i18n.ts';
import middleware from "i18next-http-middleware";
import cookieParser from 'cookie-parser';
import {authRoutes} from './routes/authRoutes';
import {userRoutes} from './routes/userRoutes';
import {eventRoutes} from './routes/eventRoutes.ts';
import {defaultPORT} from './config.ts'
import {fileRoutes} from "./routes/fileRoutes.ts";

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

const PORT = process.env.PORT || defaultPORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
