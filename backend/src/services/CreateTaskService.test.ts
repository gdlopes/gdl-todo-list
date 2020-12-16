import mongoose from 'mongoose';
import Task from '../models/Task';

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
    await Task.deleteMany({});
  });

  it('Should be able to create new task', async () => {
    const task = await Task.create({
      description: 'Test task',
      date: new Date(),
      done: false
    });

    const listTaks = await Task.find({});

    expect(listTaks[0]._id).toEqual(task._id);
  });
});