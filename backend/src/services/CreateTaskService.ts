import TaskRepository from '../repositories/TaskRepository';

class CreateTaskService {
  public async execute({ description, date, done }) {
    const taskRepository = new TaskRepository();

    const task = await taskRepository.create({
      description,
      date,
      done
    });

    return task;
  }
}

export default CreateTaskService;