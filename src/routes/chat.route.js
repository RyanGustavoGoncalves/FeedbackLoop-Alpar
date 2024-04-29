import { Router } from 'express';
import { ChatController } from '../controller/chat.controller.js';

export const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post('/send', chatController.send);
chatRouter.get('/get', chatController.getAllMessage);
chatRouter.get('/delete', chatController.deleteAllMessage);
chatRouter.put('/update/:id', chatController.updateMessage);
chatRouter.delete('/delete/:id', chatController.deleteMessage);