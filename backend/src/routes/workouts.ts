import { Router } from 'express';
import WorkoutModel from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().sort({ createdAt: -1 }).lean();
    res.json(workouts);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;
