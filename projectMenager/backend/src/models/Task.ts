// src/models/Task.ts
import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  storyId: { type: Schema.Types.ObjectId, ref: 'Story', required: true },
  estimatedTime: { type: Number, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  createdAt: { type: Date, default: Date.now },
  startAt: { type: Date },
  endAt: { type: Date },
  assignedUserId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Task', taskSchema);
