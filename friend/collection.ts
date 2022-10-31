import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../user/model';
import FriendModel, { Friend } from './model';
import UserModel from '../user/model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore friends
 * stored in MongoDB, including adding, finding, updating, and deleting friends.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Friend> is the output of the FriendModel() constructor,
 * and contains all the information in Friend. https://mongoosejs.com/docs/typescript.html
 */
class FriendCollection {
  /**
   * Set up a Friend object for user with s given userId
   *
   * @param {Types.ObjectId} userId - the id of the user
   * @return {Promise<HydratedDocument<Friend>>} - the Friend object
   */
  static async addOne(userId: Types.ObjectId): Promise<void> {
    const Friend = new FriendModel({
      userId:userId,
      friends:[],
      friendMe:[]
    });
    await Friend.save();
  }

  /**
   * adds a Friend
   *
   * @param {string} friendId - the id of the user is adding as friend
   * @param {string} userId - The id of the user that is being added as friend
   */
  static async addFriendById(friendId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
    FriendModel.updateOne({userId:userId},{$addToSet: {firends:friendId}});
    FriendModel.updateOne({userId:friendId},{$addToSet: {friendMe:userId}});
  }

  /**
   * deletes a Friend
   *
   * @param {string} friendId - the id of the user is unadded as friend
   * @param {string} userId - The id of the user that is being unadded as friend
   */
   static async deleteFriendById(friendId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
    FriendModel.updateOne({userId:userId},{$pull: {firends:friendId}});
    FriendModel.updateOne({userId:friendId},{$pull: {friendMe:userId}});
  }

  /**
   * adds a Friend
   *
   * @param {string} FriendUsername - the username of the user that is Friending the other
   * @param {string} userId - The id of the user that is being Friended
   */
  static async addFriendByUsername(friendUsername: string, userId: Types.ObjectId): Promise<void> {
    const friendId = (await UserCollection.findOneByUsername(friendUsername))._id
    FriendModel.updateOne({userId:userId},{$addToSet: {firends:friendId}});
    FriendModel.updateOne({userId:friendId},{$addToSet: {friendMe:userId}});
  }

  /**
   * deletes a Friend 
   *
   * @param {string} unFriendingUsername - the username of the user that is unnFriending the other
   * @param {string} userId - The id of the user that is being Friended
   */
  static async deleteFriendByUsername(unFriendUsername:string, userId: Types.ObjectId): Promise<void> {
    const unFriendId = (await UserCollection.findOneByUsername(unFriendUsername))._id;
    FriendModel.updateOne({userId:userId},{$pull: {firends:unFriendId}});
    FriendModel.updateOne({userId:unFriendId},{$pull: {friendMe:userId}});
  }

  /**
   * adds one user as a Friender of another
   *
   * @param {string} userId - the id of the user that is Friending the other
   */
  static async findOneById(userId: Types.ObjectId): Promise<HydratedDocument<Friend>> {
    return FriendModel.findOne({userId:userId}).populate('userId').populate('friends').populate('friendMe');
  }  

  /**
   * adds one user as a Friender of another
   *
   * @param {string} username - the username of the one that you are finding the Friend model for
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<Friend>> {
    const userId = (await UserCollection.findOneByUserId(username))._id;
    return FriendModel.findOne({user:userId}).populate('userId').populate('friends').populate('freindMe');
  }

  /**
   * determine if a user is Friending another user
   *
   * @param {string} friendId - the id of the account that is checked if Friended
   * @param {string} userId - The id of the user that is being Friended
   */
   static async checkFriendById(friendId: Types.ObjectId, userId: Types.ObjectId): Promise<Boolean> {
    const Friend = await this.findOneById(userId);
    return Friend.friends.includes(friendId);
  }  

  /**
   * determine if there is a friendship pair between users
   *
   * @param {string} friendId - the id of the account that is checked if Friended
   * @param {string} userId - The id of the user that is being Friended
   */
   static async checkFriendshipById(friendId: Types.ObjectId, userId: Types.ObjectId): Promise<Boolean> {
    const friendFriends = await this.findOneById(userId);
    const userFriends = await this.findOneById(friendId);
    return friendFriends.friends.includes(userId) && userFriends.friends.includes(friendId);
  }  

  /**
   * deletes a Friend 
   *
   * @param {string} friendUsername - the username of the user that is unFriending the other
   * @param {string} userId - The id of the user that is being Friended
   */
  static async checkFololowingByUsername(friendUsername:string, userId: Types.ObjectId): Promise<Boolean> {
    const friendId = (await UserCollection.findOneByUserId(friendUsername))._id;
    return this.checkFriendById(friendId,userId);
  }
  /**
   * determine if there is a friendship pair between users
   *
   * @param {string} friendId - the id of the account that is checked if Friended
   * @param {string} userId - The id of the user that is being Friended
   */
  static async checkFriendshipByUsername(friendUsername: string, userId: Types.ObjectId): Promise<Boolean> {
    const friendId = (await UserCollection.findOneByUserId(friendUsername))._id;
    return this.checkFriendshipById(friendId,userId);
  }  

}

export default FriendCollection;
