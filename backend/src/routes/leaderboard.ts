import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate('team', 'name city')
      .populate('entries.user', 'name email totalPoints')
      .sort({ updatedAt: -1 })
      .lean();
    res.json(leaderboard);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;
