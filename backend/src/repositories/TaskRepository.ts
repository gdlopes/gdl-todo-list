import Task, { ITask } from '../models/Task';

import ITaskDTO from '../dtos/ITask';
import IUpdateTaskDTO from '../dtos/IUpdateTaskDTO';

import ITaskRepository from './ITaskRepository';

class TaskRepository implements ITaskRepository {
  public async listAll(): Promise<ITask[]> {
    const tasks = await Task.find();

    return tasks;
  }

  public async create(taskData: ITaskDTO): Promise<ITask> {
    const task = await Task.create(taskData);

    return task;
  }

  public async findById(id: string): Promise<ITask | undefined> {
    const findTask = await Task.findOne({ _id: id });

    return findTask;
  }

  public async update(data: IUpdateTaskDTO): Promise<ITask> {
    const { _id } = data;

    const updatedTask = await Task.findByIdAndUpdate(_id, data, { new: true });

    return updatedTask;
  }

  public async delete(id: string): Promise<ITask> {
    return Task.findByIdAndDelete(id);
  }
}

export default TaskRepository;