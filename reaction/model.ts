// import type {Types, PopulatedDoc, Document} from 'mongoose';
// import {Schema, model} from 'mongoose';
// import type {User} from '../user/model';

// /**
//  * This file defines the properties stored in a Reaction
//  * DO NOT implement operations here ---> use collection file
//  */

// export enum React {like,love,laugh,crying,astonished,happy};

// // Type definition for Reaction on the backend
// export type ParameterizedReaction<U> = {
//   _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
//   freetId: Types.ObjectId
//   likes:Array<U>
//   loves:Array<U>
//   laughs:Array<U>
//   cryings:Array<U>
//   astonisheds:Array<U>
//   happys:Array<U>
// };

// export type PopulatedReaction = {
//   _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
//   authorId: User;
//   dateCreated: Date;
//   content: string;
//   dateModified: Date;
//   numViews:Number
//   views:Array<User>;
//   reacts:Array<Array<Number>>
//   numReacts:Number

// };

// // Mongoose schema definition for interfacing with a MongoDB table
// // Reactions stored in this table will have these fields, with the
// // type given by the type property, inside MongoDB
// const ReactionSchema = new Schema<Reaction>({
//   // The author userId
//   authorId: {
//     // Use Types.ObjectId outside of the schema
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   // The date the Reaction was created
//   dateCreated: {
//     type: Date,
//     required: true
//   },
//   // The content of the Reaction
//   content: {
//     type: String,
//     required: true
//   },
//   // The date the Reaction was modified
//   dateModified: {
//     type: Date,
//     required: true
//   }
// });

// const ReactionModel = model<Reaction>('Reaction', ReactionSchema);
// export default ReactionModel;
