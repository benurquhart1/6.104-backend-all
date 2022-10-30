import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../user/model';
import FollowModel, { Follow } from './model';
import UserModel from '../user/model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore follows
 * stored in MongoDB, including adding, finding, updating, and deleting follows.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Follow> is the output of the FollowModel() constructor,
 * and contains all the information in Follow. https://mongoosejs.com/docs/typescript.html
 */
class FollowCollection {
  /**
   * Set up a follow object for user with s given userId
   *
   * @param {Types.ObjectId} userId - the id of the user
   * @return {Promise<HydratedDocument<Follow>>} - the follow object
   */
  static async addOne(userId: Types.ObjectId): Promise<void> {
    const follow = new FollowModel({
      userId:userId,
      followers:[],
      following:[]
    });
    await follow.save();
  }

  /**
   * adds a follow
   *
   * @param {string} followingId - the id of the user that is following the other
   * @param {string} followerId - The id of the user that is being followed
   */
  static async addFollowById(followingId: Types.ObjectId, followerId: Types.ObjectId): Promise<void> {
    FollowModel.updateOne({userId:followerId},{$addToSet: {following:followingId}});
    FollowModel.updateOne({userId:followingId},{$addToSet: {follower:followerId}});
  }

  /**
   * deletes a follow
   *
   * @param {string} unfollowingId - the id of the user that is unfollowing the other
   * @param {string} followerId - The id of the user that is being followed
   */
  static async deleteFollowById(unfollowingId: Types.ObjectId, followerId: Types.ObjectId): Promise<void> {
    FollowModel.updateOne({userId:followerId},{$pull: {following:unfollowingId}});
    FollowModel.updateOne({userId:unfollowingId},{$pull: {follower:followerId}});
  }

  /**
   * adds a follow
   *
   * @param {string} followingUsername - the username of the user that is following the other
   * @param {string} followerId - The id of the user that is being followed
   */
  static async addFollowByUsername(followingUsername: string, followerId: Types.ObjectId): Promise<void> {
    const followingId = (await UserCollection.findOneByUserId(followingUsername))._id
    FollowModel.updateOne({userId:followerId},{$addToSet: {following:followingId}});
    FollowModel.updateOne({userId:followingId},{$addToSet: {follower:followerId}});
  }

  /**
   * deletes a follow 
   *
   * @param {string} unfollowingUsername - the username of the user that is unnfollowing the other
   * @param {string} followerId - The id of the user that is being followed
   */
  static async deleteFollowByUsername(unfollowingUsername:string, followerId: Types.ObjectId): Promise<void> {
    const unfollowingId = (await UserCollection.findOneByUserId(unfollowingUsername))._id;
    FollowModel.updateOne({userId:followerId},{$pull: {following:unfollowingId}});
    FollowModel.updateOne({userId:unfollowingId},{$pull: {follower:followerId}});
  }

  /**
   * adds one user as a follower of another
   *
   * @param {string} userId - the id of the user that is following the other
   */
  static async findOneById(userId: Types.ObjectId): Promise<HydratedDocument<Follow>> {
    return FollowModel.findOne({userId:userId}).populate('userId').populate('following').populate('follower');
  }  

  /**
   * adds one user as a follower of another
   *
   * @param {string} username - the username of the one that you are finding the Follow model for
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<Follow>> {
    const userId = (await UserCollection.findOneByUserId(username))._id;
    return FollowModel.findOne({user:userId}).populate('userId').populate('following').populate('follower');
  }

  /**
   * determine if a user is following a
   *
   * @param {string} followingId - the id of the account that is checked if followed
   * @param {string} followerId - The id of the user that is being followed
   */
   static async checkFollowingById(followingId: Types.ObjectId, followerId: Types.ObjectId): Promise<Boolean> {
    const follow = await this.findOneById(followerId);
    return follow.following.includes(followingId);
  }  

  /**
   * deletes a follow 
   *
   * @param {string} followingUsername - the username of the user that is unnfollowing the other
   * @param {string} followerId - The id of the user that is being followed
   */
  static async checkFololowingByUsername(followingUsername:string, followerId: Types.ObjectId): Promise<Boolean> {
    const followingId = (await UserCollection.findOneByUserId(followingUsername))._id;
    return this.checkFollowingById(followingId,followerId);
  }

}

export default FollowCollection;
