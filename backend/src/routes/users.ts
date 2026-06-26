import { Router } from 'express';
import UserModel from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find().populate('team', 'name city').lean();
    res.json(users);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default usersRouter;
