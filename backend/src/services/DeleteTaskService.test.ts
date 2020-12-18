import 'reflect-metadata';
import AppError from '../middlewares/AppError';

import mongoose from 'mongoose';
import Task from '../models/Task';

import TaskRepository from '../repositories/TaskRepository';
import DeleteTaskService from '../services/DeleteTaskService';


let taskRepository: TaskRepository;
let deleteTask: DeleteTaskService;

describe('DeleteTaskService', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized');
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    taskRepository = new TaskRepository();
    deleteTask = new DeleteTaskService(taskRepository)

    await Task.deleteMany({});
  });

  describe('When the choosen task exists', () => {
    it('Should be able to delete this task', async () => {
      const task = await taskRepository.create({
        description: 'Create test task',
        date: new Date(),
        done: false
      });

      await deleteTask.execute(task._id);

      const checkTask = await taskRepository.findById(task._id);

      expect(checkTask).toBeNull();

      await Task.deleteMany({});
    });
  });

  describe('When the choosen task doen not exists', () => {
    it('Should not be able to delete this task', async () => {
      const nonExistingTaskId = '5fda906d5631ee3350ef93a8';

      await expect(
        deleteTask.execute(nonExistingTaskId)
      ).rejects.toBeInstanceOf(AppError);

      await Task.deleteMany({});
    });
  });
});