import type {Request, Response, NextFunction} from 'express';
import FollowCollection from '../follow/collection';

/**
 * Checks if a user follows the user with req.params.username
 */
const isFollowing = async (req: Request, res: Response, next: NextFunction) => {
  const following = await FollowCollection.checkFololowingByUsername(req.params.username,req.session.userId);
  if (!following) {
    res.status(404).json({
      error: {
        followNotFound: `You do not follow ${req.params.username}`
      }
    });
    return;
  }
  next();
};

/**
 * Checks if a user is not following the user with req.params.username
 */
const isNotFollowing = async (req: Request, res: Response, next: NextFunction) => {
  const following = await FollowCollection.checkFololowingByUsername(req.params.username,req.session.userId);
  if (following) {
    res.status(404).json({
      error: {
        followFound: `You are following ${req.params.username}`
      }
    });
    return;
  }
  next();
};

export {
  isFollowing,
  isNotFollowing
};