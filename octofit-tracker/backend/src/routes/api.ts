import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

export const apiRouter = Router();

apiRouter.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().select('-password').sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/users', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    const userData = user.toObject() as Record<string, unknown>;
    delete userData.password;
    response.status(201).json(userData);
  } catch (error) {
    next(error);
  }
});

const registerCrudRoutes = <T extends { find: Function; create: Function }>(path: string, entity: T) => {
  apiRouter.get(path, async (_request, response, next) => {
    try {
      response.json(await entity.find());
    } catch (error) {
      next(error);
    }
  });

  apiRouter.post(path, async (request, response, next) => {
    try {
      response.status(201).json(await entity.create(request.body));
    } catch (error) {
      next(error);
    }
  });
};

registerCrudRoutes('/teams', Team);
registerCrudRoutes('/activities', Activity);
registerCrudRoutes('/leaderboard', Leaderboard);
registerCrudRoutes('/workouts', Workout);
