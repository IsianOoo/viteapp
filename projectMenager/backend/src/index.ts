// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';
import storyRoutes from './routes/storyRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB connection
const mongoURI = 'your_mongoDB_connection_string';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
