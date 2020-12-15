import { injectable, inject } from 'tsyringe';

import ITaskRepository from '../repositories/ITaskRepository';

import AppError from '../middlewares/AppError';

@injectable()
class DeleteTaskService {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) { }

  public async execute(id) {
    const taskExists = await this.taskRepository.findById(id);

    if (!taskExists) {
      throw new AppError('This task does not exists.');
    }

    return this.taskRepository.delete(id);
  }
}

export default DeleteTaskService;