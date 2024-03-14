import express, { json } from 'express';
import dotenv from 'dotenv';
import industryRoutes from './Routes/industry.Routes';
import authRoutes from './Routes/auth.Routes';
import cors from 'cors';
import userRoutes from './Routes/user.Routes';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const PORT = process.env.PORT;

// Routes
app.use('/auth', authRoutes);
app.use('/industry', industryRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log('App is listening on port', PORT);
})


// Socketio test
import { Server } from 'socket.io'

const server = new Server();

server.on('connection', (server)=>{
    console.log('connected');
    
});

server.listen(4399)