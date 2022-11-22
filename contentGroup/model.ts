import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { User } from 'user/model';

/**
 * This file defines the properties stored in a content group
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Conternt Groups on the backend
export type ContentGroup = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  name: string;
  isPublic:Boolean;
  description:string;
  owner:Schema.Types.ObjectId;
  moderators:Array<Schema.Types.ObjectId>;
  followers:Array<Schema.Types.ObjectId>;
  accounts:Array<Schema.Types.ObjectId>;
};

export type PopulatedContentGroup = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  name: string;
  isPublic:Boolean;
  description:string;
  owner:User;
  moderators:Array<User>;
  followers:Array<User>;
  accounts:Array<User>;
};

// Mongoose schema definition for interfacing with a MongoDB table
// content groups stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ContentGroupSchema = new Schema({
  // The name of the content group
  name: {
    type: String,
    required: true
  },
  // a boolean representing whether the content group is public or private
  isPublic: {
    type: Boolean,
    required: true
  },
  // a discription of the content group
  description: {
    type: Date,
    required: false
  },
  // the user who owns the content group
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // a list of users who can edit the content group
  moderators: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  // a list of users that follow the content group
  followers: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  // a list of accounts included in the posts for the content group
  accounts: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
});

const ContentGroupModel = model<ContentGroup>('ContentGroup', ContentGroupSchema);
export default ContentGroupModel;
