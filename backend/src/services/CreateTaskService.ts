import { injectable, inject } from 'tsyringe';

import ITaskRepository from '../repositories/ITaskRepository';
import ITaskDTO from '../dtos/ITask';

@injectable()
class CreateTaskService {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) { }

  public async execute({ description, date, done }: ITaskDTO) {
    const task = await this.taskRepository.create({
      description,
      date,
      done
    });

    return task;
  }
}

export default CreateTaskService;