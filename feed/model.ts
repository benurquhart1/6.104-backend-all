import { PopulatedFreet } from '../freet/model';
import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Feed
 * DO NOT implement operations here ---> use collection file
 */

export enum Sort {date= 0, dateReversed, reacts, views, reactsPerView}

}
// Type definition for Feed on the backend
export type Feed = {
  _id:Types.ObjectId;
  name:string;
  userId:Types.ObjectId;
  accounts: Array<Types.ObjectId>;
  freets: Array<Types.ObjectId>;
  sort:Sort;
  showViewedFreets:Boolean;
};

export type PopulatedFeed = {
  _id:Types.ObjectId;
  name:string;
  userId:User;
  accounts: Array<User>;
  freets: Array<PopulatedFreet>;
  sort:Sort;
  showViewedFreets:Boolean;
}


// Mongoose schema definition for interfacing with a MongoDB table
// Feeds stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FeedSchema = new Schema<Feed>({
  // The user id of the feed
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // the name of the feed/content group
  name: [{
    type: Schema.Types.String,
    required: true,
  }],
  // A list of accounts whose posts are in the feed
  accounts: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  // A list of freets in the feed
  freets: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  }],
  // the current sorting method for the feed
  sort: {
    type: Number,
    required: true
  },
  // Whether or not the feed will show freets which the user has viewed
  showViewedFreets: {
    type: Boolean,
    required: true
  }
});

const FeedModel = model<Feed>('Feed', FeedSchema);
export default FeedModel;