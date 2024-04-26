import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';

export const chatRouter = Router();

userRouter.post('/send', userController.registerUser);
userRouter.get('/getAll', userController.getAllUser);