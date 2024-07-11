// src/routes/projectRoutes.ts
import express from 'express';
import Project from '../models/Project';

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

router.put('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

export default router;
