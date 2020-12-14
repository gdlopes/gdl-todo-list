import TaskRepository from '../repositories/TaskRepository';

import AppError from '../middlewares/AppError';

class UpdateTaskService {
  public async execute(data) {
    const { _id } = data;

    const taskRepository = new TaskRepository();

    const taskExists = await taskRepository.findById(_id);
    if (!taskExists) throw new AppError('This task does not exists.');

    const updatedTask = await taskRepository.update(data);

    return updatedTask;
  }
}

export default UpdateTaskService;