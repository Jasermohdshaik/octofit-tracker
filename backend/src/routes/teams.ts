import { Router } from 'express';
import TeamModel from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await TeamModel.find().populate('members', 'name email').lean();
    res.json(teams);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
