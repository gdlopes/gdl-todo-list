import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import mongoose from 'mongoose';
import { router } from './routes';

import AppError from './middlewares/AppError';

const app = express();

mongoose.connect(
  'mongodb+srv://gdl-todo-list:gdl-todo-list@cluster0.4vyya.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }


  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

app.listen(3333, () => {
  console.log('Server running');
});
