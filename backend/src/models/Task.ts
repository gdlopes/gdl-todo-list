import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  description: string;
  date: Date;
  done: boolean;
}

const TaskSchema: Schema = new mongoose.Schema({
  description: String,
  date: { type: Date, default: new Date().setHours(0, 0, 0, 0) },
  done: { type: Boolean, default: false }
});

export default mongoose.model<ITask>('Task', TaskSchema);