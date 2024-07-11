// src/models/Story.ts
import { Schema, model } from 'mongoose';

const storySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default model('Story', storySchema);
