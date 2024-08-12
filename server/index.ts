import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { eventRoutes } from './routes/eventRoutes.ts';

const app = express();

// 允许所有来源的跨域请求（仅在开发环境中使用）
app.use(cors({
    origin: 'http://localhost:5173', // 假设你的前端在 3000 端口
    credentials: true, // 允许发送Cookie等凭证信息
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 8030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
