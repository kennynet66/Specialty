import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

const connectedUsers: Map<string, Socket> = new Map();

io.on('connection', (socket: Socket) => {
    const userId: string = socket.handshake.headers.userid as string;
    connectedUsers.set(userId, socket); // Store the socket associated with the user id
    
    console.log('A client connected', socket.id, 'with userId:', userId);

    socket.on('message', (message: { message: string, recipientId: string }) => {
        console.log('Received message:', message.message, "To be sent to", message.recipientId);

        const recipientSocket = connectedUsers.get(message.recipientId);
        if (recipientSocket) {
            recipientSocket.emit('message', message.message); // Emit message to the recipient socket
            console.log("emitting to recipient", message.recipientId);
        } else {
            console.log("Recipient with userId", message.recipientId, "is not connected.");
        }
    });
});

const PORT = 5050;
httpServer.listen(PORT, () => {
    console.log(`Waiting for chats on port ${PORT}`);
});