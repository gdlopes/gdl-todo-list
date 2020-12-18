import 'reflect-metadata';

import mongoose from 'mongoose';
import Task from '../models/Task';

import TaskRepository from '../repositories/TaskRepository';
import ListTasksService from '../services/ListTasksService';

let taskRepository: TaskRepository;
let listTasks: ListTasksService;

describe('CreateTaskService', () => {
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
    listTasks = new ListTasksService(taskRepository);

    await Task.deleteMany({});
  });

  describe('When there is some task at database', () => {
    it('Should return these tasks', async () => {
      await taskRepository.create({
        description: 'Create test task 01',
        date: new Date(),
        done: false
      });

      await taskRepository.create({
        description: 'Create test task 02',
        date: new Date(),
        done: false
      });

      const allTasks = await listTasks.execute();

      expect(allTasks.length).toEqual(2);

      await Task.deleteMany({});
    });
  });

  describe('When there is no task at database', () => {
    it('Should return an empty array', async () => {
      const allTasks = await listTasks.execute();

      expect(allTasks).toEqual([]);

      await Task.deleteMany({});
    });
  });
});