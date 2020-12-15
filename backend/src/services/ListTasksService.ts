import { injectable, inject } from 'tsyringe';

import ITaskRepository from '../repositories/ITaskRepository';

@injectable()
class ListTaskService {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) { }

  public async execute() {
    const tasks = await this.taskRepository.listAll();

    return tasks;
  }
}

export default ListTaskService;