import 'reflect-metadata';

import mongoose from 'mongoose';
import Task from '../models/Task';

import TaskRepository from '../repositories/TaskRepository';
import CreateTaskService from '../services/CreateTaskService';

let taskRepository: TaskRepository;
let createTask: CreateTaskService;

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
    createTask = new CreateTaskService(taskRepository);

    await Task.deleteMany({});
  });

  describe('When the task does not exists', () => {
    it('Should be able to create new task', async () => {
      const task = await createTask.execute({
        description: 'Create test task',
        date: new Date(),
        done: false
      });

      expect(!!task._id).toBeTruthy();
      expect(task.description).toEqual('Create test task');

      await Task.deleteMany({});
    });
  });
});