import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all users that the user follows
 *
 * @name GET /api/follow?userId=id
 * @return {FollowResponse} - A list of all users that user is following
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 */

/**
 * Get a the usernames that a user is following and followed by
 *
 * @name GET /api/follow?username=username
 *
 * @return {FollowResponse} - an object containing the usernames that a user is following and followed by
 * @throws {400} - If username is not given
 * @throws {404} - If no user has given username
 *
 */
router.get(
  '/',
  userValidator.isUsernameExistsQuery,
  async (req: Request, res: Response) => {
    const followObject = await FollowCollection.findOneByUsername(req.query.username as string);
    const response = util.constructFollowResponse(followObject);
    res.status(200).json(response);
  }
);

/**
 * One user follows another user
 *
 * @name POST /api/freets
 *
 * @param {string} following - The content of the freet
 * @return {FollowResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If username is not given
 * @throws {404} - If no user has given username
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isUsernameExists,
  ],
  async (req: Request, res: Response) => {
    const followObject = await FollowCollection.addFollowBy
    const response = util.constructFollowResponse(followObject);
    res.status(200).json(response);
  }
);

/**
 * Delete a freet
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier
  ],
  async (req: Request, res: Response) => {
    await FreetCollection.deleteOne(req.params.freetId);
    res.status(200).json({
      message: 'Your freet was deleted successfully.'
    });
  }
);

/**
 * Modify a freet
 *
 * @name PUT /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.put(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier,
    freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const freet = await FreetCollection.updateOne(req.params.freetId, req.body.content);
    res.status(200).json({
      message: 'Your freet was updated successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

export {router as freetRouter};
