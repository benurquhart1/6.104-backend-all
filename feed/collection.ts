import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../user/model';
import FeedModel, { Feed, Sort } from './model';
import UserModel from '../user/model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore feeds
 * stored in MongoDB, including adding, finding, updating, and deleting feed.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Feed> is the output of the FeedModel() constructor,
 * and contains all the information in Feed. https://mongoosejs.com/docs/typescript.html
 */
class FeedCollection {
  /**
   * Set up a feed object for user with s given userId
   *
   * @param {Types.ObjectId} userId - the id of the user
   * @return {Promise<HydratedDocument<Feed>} - the feed object
   */
  static async addOne(userId: Types.ObjectId,name:string): Promise<void> {
    const feed = new FeedModel({
      name:name,
      userId:userId,
      accounts:[],
      freets:[],
      sort:Sort.date,
      showViewedFreets: false,
    });
    await feed.save();
    return await feed.populate("userId accounts freets");
  }

}

export default FeedCollection;
