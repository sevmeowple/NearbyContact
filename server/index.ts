import express from 'express';
import {defaultPORT} from './config';
import {authRoutes} from './routes/authRoutes';
import {userRoutes} from './routes/userRoutes';
import {eventRoutes} from "./routes/eventRoutes.ts";

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || defaultPORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});