import type {HydratedDocument} from 'mongoose';
import type {Feed, PopulatedFeed} from '../feed/model';

// Update this if you add a property to the Freet type!
type FeedResponse = {
  name:string;
  accounts: Array<string>;
  sort:Number;
  showViewedFreets:Boolean;
};

/**
 * Transform a raw Feed object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Feed>} feed - A feed object
 * @returns {FeedResponse} - The feed object formatted for the frontend
 */
const constructFeedResponse = (feed: HydratedDocument<PopulatedFeed>): FeedResponse => {
  const feedCopy: PopulatedFeed = {
    ...feed.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const name:string = feedCopy.name;
  const accounts:Array<string> = feedCopy.accounts.map(user => user.username);
  const sort = feedCopy.sort;
  const showViewedFreets = feedCopy.showViewedFreets;
  return {
    name:name,
    accounts: accounts,
    sort:sort,
    showViewedFreets:showViewedFreets,
  };
};

export {
  constructFeedResponse
};