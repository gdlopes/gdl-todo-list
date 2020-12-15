import { container } from 'tsyringe';

import ITaskRepository from '../repositories/ITaskRepository';
import TaskRepository from '../repositories/TaskRepository';

container.registerSingleton<ITaskRepository>(
  'TaskRepository',
  TaskRepository
);