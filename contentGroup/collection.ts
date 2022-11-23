import type {HydratedDocument, Types} from 'mongoose';
import UserCollection from 'user/collection';
import UserModel from 'user/model';
import type {ContentGroup, PopulatedContentGroup} from './model';
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
   * @param {Boolean} isPublic - A boolen representing whether or not the profile is public
   * @param {string} description - The ContentGroup's description
   * @return {Promise<HydratedDocument<ContentGroup>>} - The newly created ContentGroup
   */
  static async addOne(name: string, userId: Types.ObjectId, isPublic:Boolean, description:string=''): Promise<HydratedDocument<ContentGroup>> {
    const contentGroup = new ContentGroupModel({
      name:name,
      isPublic:false,
      description:description,
      owner:userId,
      moderators:[userId],
      followers:[userId],
      accounts:[],
    });
    await contentGroup.save(); // Saves ContentGroup to MongoDB
    return contentGroup;
  }
  
  /**
   * finds a content group with a given name
   *
   * @param {string} name - The name of the content group
   * @return {Promise<HydratedDocument<PopulatedContentGroup>> | Promise<null>} - The ContentGroup with the given ContentGroupname, if any
   */
  static async findOne(name:string): Promise<HydratedDocument<PopulatedContentGroup>> {
    return await ContentGroupModel.findOne({name:name}).populate("owner moderators followers accounts");
  }

  /**
   * deletes a content group with a given name
   *
   * @param {string} name - The name of the content group
   * @return {Promise<HydratedDocument<PopulatedContentGroup>> | Promise<null>} - The ContentGroup with the given ContentGroupname, if any
   */
  static async deleteOne(name:string): Promise<void> {
    await ContentGroupModel.deleteOne({name:name});
  }

  /**
   * add a moderator to a content group
   * 
   * @param {string} owner - the owner of the content group
   * @param {string} name - The name of the content group
   * @param {string} moderator - the username of the moderator being added to the account
   */
  static async addModerator(owner:string, name:string, moderator: string): Promise<void> {
    const ownerId = (await UserCollection.findOneByUsername(owner))._id;
    const moderatorId = (await UserCollection.findOneByUsername(moderator))._id;
    await ContentGroupModel.updateOne({owner:ownerId,name:name},{$addToSet: {moderator:moderatorId}});
  }

  /**
   * remove a moderator from a content group
   * 
   * @param {string} owner - the owner of the content group
   * @param {string} name - The name of the content group
   * @param {string} moderator - the username of the moderator being added to the account
   */
   static async removeModerator(owner:string, name:string, moderator: string): Promise<void> {
    const ownerId = (await UserCollection.findOneByUsername(owner))._id;
    const moderatorId = (await UserCollection.findOneByUsername(moderator))._id;
    await ContentGroupModel.updateOne({owner:ownerId,name:name},{$pull: {moderator:moderatorId}});
  }




}

export default ContentGroupCollection;
