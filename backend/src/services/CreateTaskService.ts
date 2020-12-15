import { injectable, inject } from 'tsyringe';

import ITaskRepository from '../repositories/ITaskRepository';

@injectable()
class CreateTaskService {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) { }

  public async execute({ description, date, done }) {
    const task = await this.taskRepository.create({
      description,
      date,
      done
    });

    return task;
  }
}

export default CreateTaskService;