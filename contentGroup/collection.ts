import FeedCollection from '../feed/collection';
import FollowGroupCollection from '../followGroup/collection';
import type {HydratedDocument, Types} from 'mongoose';
import UserCollection from '../user/collection';
import UserModel from '../user/model';
import type {ContentGroup} from './model';
import ContentGroupModel from './model';

/**
 * This file contains a class with functionality to interact with ContentGroups stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<ContentGroup> is the output of the ContentGroupModel() constructor,
 * and contains all the information in ContentGroup. https://mongoosejs.com/docs/typescript.html
 */
class ContentGroupCollection {
  /**
   * Add a new ContentGroup object
   *
   * @param {string} name - The name of the content group
   * @param {Types.ObjectId} userId - the id of the user creating the content group
   * @param {string} description - The ContentGroup's description
   * @return {Promise<void>} - The newly created ContentGroup
   */
  static async addOne(name: string, userId: Types.ObjectId | string, description:string=''): Promise<HydratedDocument<ContentGroup>> {
    const contentGroup = new ContentGroupModel({
      name:name,
      description:description,
      owner:userId,
      moderators:[],
      followers:[],
      accounts:[],
    });
    await contentGroup.save(); // Saves ContentGroup to MongoDB
    await ContentGroupModel.updateOne({name:name},{$addToSet: {followers:userId}});
    await ContentGroupModel.updateOne({name:name},{$addToSet: {moderators:userId}});
    await contentGroup.save();
    return contentGroup;
  }
  
  /**
   * finds a content group with a given name
   *
   * @param {string} name - The name of the content group
   * @return {Promise<HydratedDocument<ContentGroup>> | Promise<null>} - The ContentGroup with the given ContentGroupname, if any
   */
  static async findOne(name:string): Promise<HydratedDocument<ContentGroup>> {
    return ContentGroupModel.findOne({name:name}); //.populate("owner").populate('followers').populate('moderators').populate('accounts');
  }

  /**
   * deletes a content group with a given name
   *
   * @param {string} name - The name of the content group
   */
  static async deleteOne(name:string): Promise<void> {
    const group = await ContentGroupModel.findOne({name:name});
    for (const follower in group.followers) {
      const followerId = (await UserCollection.findOneByUsername(follower))._id
      await FeedCollection.deleteOne(follower,name);
      // await FollowGroupCollection.removeOne()
    }
    await ContentGroupModel.deleteOne({name:name});
  }

  /**
   * add a moderator to a content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} moderator - the username of the moderator being added to the account
   */
  static async addModerator(name:string, moderator: string): Promise<void> {
    const moderatorId = (await UserCollection.findOneByUsername(moderator))._id;
    await ContentGroupModel.updateOne({name:name},{$addToSet: {moderators:moderatorId}});
  }

  /**
   * remove a moderator from a content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} moderator - the username of the moderator being added to the account
   */
  static async removeModerator(name:string, moderator: string): Promise<void> {
    const moderatorId = (await UserCollection.findOneByUsername(moderator))._id;
    await ContentGroupModel.updateOne({name:name},{$pull: {moderators:moderatorId}});
  }

  /**
   * check if the user is a moderator for the content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} userId - the id of the account that you are checkng if is owner
   * 
   * @returns {Promies<Boolean>} a boolean representing whether or not the user is a moderator
   */
  static async isModerator(name:string, userId: Types.ObjectId | string): Promise<Boolean> {
    const group = await ContentGroupModel.find({name:name,moderator:userId}).exec();
    return group !== null;
  }

  /**
   * check if the user is the owner of the content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} userId - the id of the account that you are checkng if is owner
   * 
   * @returns {Promies<Boolean>} a boolean representing whether or not the user is a moderator
   */
   static async isOwner(name:string, userId: Types.ObjectId | string): Promise<Boolean> {
    const group = await ContentGroupModel.find({name:name,owner:userId}).exec();
    return group !== null;
  }

  /**
   * add an account to a content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} account - the username of the account being added to the account
   */
  static async addAccount(name:string, account: string): Promise<void> {
    const group = await ContentGroupModel.findOne({name:name})
    const accountId = (await UserCollection.findOneByUsername(account))._id;
    await ContentGroupModel.updateOne({name:name},{$addToSet: {accounts:accountId}});
    for (const following in group.followers) {
      await FeedCollection.addOneAccount(following,name,account);
    }
  }

  /**
   * remove an account from a content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} account - the username of the account being added to the account
   */
  static async removeAccount(name:string, account: string): Promise<void> {
    const group = await ContentGroupModel.findOne({name:name})
    const accountId = (await UserCollection.findOneByUsername(account))._id;
    await ContentGroupModel.updateOne({name:name},{$pull: {accounts:accountId}});
    for (const following in group.followers) {
      await FeedCollection.deleteOneAccount(following,name,account);
    }
  }

  /**
   * follow a content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} followerId - the username of the account being added to the account
   */
  static async addFollower(name:string, follower: string): Promise<void> {
    const group = await ContentGroupModel.findOne({name:name})
    const followerId = (await UserCollection.findOneByUsername(follower))._id;
    await ContentGroupModel.updateOne({name:name},{$addToSet: {followers:followerId}});
    const feed = await FeedCollection.addOne(followerId,name);
    for (const account in group.accounts) {
      await FeedCollection.addOneAccount(followerId,name,account)
    }
  }

  /**
   * follow a content group
   * 
   * @param {string} name - The name of the content group
   * @param {string} followerId - the username of the account being added to the account
   */
  static async removeFollower(name:string, follower: string): Promise<void> {
    const group = await ContentGroupModel.findOne({name:name})
    const followerId = (await UserCollection.findOneByUsername(follower))._id;
    await ContentGroupModel.updateOne({name:name},{$pull: {followers:followerId}});
    await FeedCollection.deleteOne(followerId,name);
  }

  /**
   * Update user's information
   *
   * @param {string} name - The name of the content group
   * @param {Object} groupDetails - the new group details
   * @return {Promise<HydratedDocument<ContentGroup>>} - The updated content group
   */
   static async updateOne(name: string, groupDetails: any): Promise<HydratedDocument<ContentGroup>> {
    if (groupDetails.addModerator) {
      await this.addModerator(name, groupDetails.addModerator);
    }

    if (groupDetails.removeModerator) {
      await this.removeModerator(name, groupDetails.removeModerator);
    }

    if (groupDetails.addAccount) {
      await this.addAccount(name, groupDetails.addAccount);
    }

    if (groupDetails.removeAccount) {
      await this.removeAccount(name, groupDetails.removeAccount);
    }

    const group = await ContentGroupModel.findOne({name:name});
    return group;
  }

}

export default ContentGroupCollection;
