import TaskRepository from '../repositories/TaskRepository';

import AppError from '../middlewares/AppError';

class DeleteTaskService {
  public async execute(id) {
    const taskRepository = new TaskRepository();

    const taskExists = await taskRepository.findById(id);

    if (!taskExists) {
      throw new AppError('This task does not exists.');
    }

    return taskRepository.delete(id);
  }
}

export default DeleteTaskService;