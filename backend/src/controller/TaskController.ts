import { Request, Response } from 'express';

import CreateTaskService from '../services/CreateTaskService';
import ListTasksService from '../services/ListTasksService';
import UpdateTaskService from '../services/UpdateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';

export default class TaskController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTasksService = new ListTasksService();

    const tasks = await listTasksService.execute();

    return response.json({ tasks });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, date, done } = request.body;

    const createTaskService = new CreateTaskService();

    const task = await createTaskService.execute({
      description,
      date,
      done
    });

    return response.json({ task });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const body = request.body;

    const updateTaskService = new UpdateTaskService();

    const task = await updateTaskService.execute({
      _id: id,
      ...body
    });

    return response.json({ task });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTaskService = new DeleteTaskService();

    await deleteTaskService.execute(id);

    return response.status(204).json();
  }
}