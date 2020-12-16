import { ITask } from '../models/Task';

import ITaskDTO from '../dtos/ITask';
import IUpdateTaskDTO from '../dtos/IUpdateTaskDTO';

export default interface ItaskRepository {
  create(data: ITaskDTO): Promise<ITask>;
  listAll(): Promise<ITask[]>;
  findById(id: string): Promise<ITask | null>;
  update(data: IUpdateTaskDTO): Promise<ITask | null>;
  delete(id: string): Promise<ITask | null>;
}