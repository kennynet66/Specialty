import { Router } from "express";
import { chatMessages, userChats } from "../Controllers/chat.Controller";

const chatRoutes = Router();

chatRoutes.get('/user-chats/:id', userChats);
chatRoutes.get('/chat-messages/:id', chatMessages);

export default chatRoutes;