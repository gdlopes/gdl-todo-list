import 'reflect-metadata';

import mongoose from 'mongoose';
import Task from '../models/Task';

import TaskRepository from '../repositories/TaskRepository';
import UpdateTaskService from '../services/UpdateTaskService';

import AppError from '../middlewares/AppError';

let taskRepository: TaskRepository;
let updateTask: UpdateTaskService;

describe('UpdateTaskService', () => {
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
    updateTask = new UpdateTaskService(taskRepository);

    await Task.deleteMany({});
  });

  describe('When the task exists', () => {
    it('Should be able to update the task', async () => {
      const task = await taskRepository.create({
        description: 'Create test task',
        date: new Date(),
        done: false
      });

      const { _id } = task;

      const updatedTask = await updateTask.execute({
        _id,
        description: 'Updated task',
        done: true
      });

      expect(updatedTask.description).toEqual('Updated task');
      expect(updatedTask._id).toEqual(task._id);

      await Task.deleteMany({});
    });
  });

  describe('When the task does not exists', () => {
    it('Should not be able to update the task', async () => {
      const nonExistingId = '5fda906d5631ee3350ef93a8';

      await expect(updateTask.execute({
        _id: nonExistingId,
        description: 'Updated task',
        done: true
      })).rejects.toBeInstanceOf(AppError);

      await Task.deleteMany({});
    });
  });
});