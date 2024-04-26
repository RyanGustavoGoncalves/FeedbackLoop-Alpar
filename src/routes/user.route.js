import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';

export const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getAllTasks);
userRouter.post('/', userController.addTasks);
userRouter.patch('/:id', userController.updateTask);
userRouter.delete('/:id', userController.deleteTasks);