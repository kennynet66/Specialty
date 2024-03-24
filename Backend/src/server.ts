import express, { json } from 'express';
import dotenv from 'dotenv';
import industryRoutes from './Routes/industry.Routes';
import authRoutes from './Routes/auth.Routes';
import cors from 'cors';
import userRoutes from './Routes/user.Routes';
import chatRoutes from './Routes/chat.Routes';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const PORT = process.env.PORT;

// Routes
app.use('/auth', authRoutes);
app.use('/industry', industryRoutes);
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);

app.listen(PORT, () => {
    console.log('App is listening on port', PORT);
})
