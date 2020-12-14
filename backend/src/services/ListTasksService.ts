import TaskRepository from '../repositories/TaskRepository';

class ListTaskService {
  public async execute() {
    const taskRepository = new TaskRepository();

    const tasks = await taskRepository.listAll();

    return tasks;
  }
}

export default ListTaskService;