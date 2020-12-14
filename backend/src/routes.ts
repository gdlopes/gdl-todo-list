import { Router } from 'express';

const router = Router();

import TaskController from './controller/TaskController';

const taskController = new TaskController();

router.get('/tasks', taskController.index);
router.post('/tasks', taskController.create);
router.put('/tasks/:id', taskController.update);
router.delete('/tasks/:id', taskController.delete);

export { router };