import express from 'express';
import jwt from 'jsonwebtoken';
import Project from '../models/Project.js';

const router = express.Router();

// Middleware to verify JWT
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      userId: req.userId,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;