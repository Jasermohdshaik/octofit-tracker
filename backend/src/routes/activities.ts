import { Router } from 'express';
import ActivityModel from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', 'name email fitnessLevel')
      .populate('team', 'name city')
      .sort({ performedAt: -1 })
      .lean();
    res.json(activities);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
