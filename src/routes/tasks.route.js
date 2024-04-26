import { Router } from 'express';
import { TasksController } from '../controller/tasks.controller.js';

export const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', tasksController.getAllTasks);
tasksRouter.post('/', tasksController.addTasks);
tasksRouter.patch('/:id', tasksController.updateTask);
tasksRouter.delete('/:id', tasksController.deleteTasks);