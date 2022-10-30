import type {Request, Response, NextFunction} from 'express';
import FollowCollection from '../follow/collection';

/**
 * Checks if a user follows the user with req.params.username
 */
const isFriending = async (req: Request, res: Response, next: NextFunction) => {
  const friending = await FollowCollection.checkFololowingByUsername(req.params.username,req.session.userId);
  if (!friending) {
    res.status(404).json({
      error: {
        followNotFound: `You do not have ${req.params.username} as a friend`
      }
    });
    return;
  }
  next();
};

/**
 * Checks if a user is not friending the user with req.params.username
 */
const isNotFriending = async (req: Request, res: Response, next: NextFunction) => {
  const friending = await FollowCollection.checkFololowingByUsername(req.params.username,req.session.userId);
  if (friending) {
    res.status(404).json({
      error: {
        followFound: `You already have ${req.params.username} as a friend`
      }
    });
    return;
  }
  next();
};

export {
  isFriending,
  isNotFriending
};