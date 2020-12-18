import { injectable, inject } from 'tsyringe';

import ITaskRepository from '../repositories/ITaskRepository';
import IUpdateTaskDTO from '../dtos/IUpdateTaskDTO';

import AppError from '../middlewares/AppError';

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) { }

  public async execute(data: IUpdateTaskDTO) {
    const { _id } = data;

    const taskExists = await this.taskRepository.findById(_id);

    if (!taskExists) throw new AppError('This task does not exists.');

    const updatedTask = await this.taskRepository.update(data);

    return updatedTask;
  }
}

export default UpdateTaskService;