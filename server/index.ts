import express from 'express';
import {authRoutes} from './routes/authRoutes';
import {userRoutes} from './routes/userRoutes';
import {defaultPORT} from './config';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || defaultPORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});