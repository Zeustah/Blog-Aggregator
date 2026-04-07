import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "src/lib/db/queries/feed-follows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { CommandHandler } from "./commands";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export async function follow(cmdName: string, url: string) {
  const currentUser = readConfig().currentUserName;
  const [feed] = await getFeedByUrl(url);
  const user = await getUserByName(currentUser);
  const feedInfo = await createFeedFollow(user.id, feed.id);
  console.log(`${feedInfo.userName} - ${feedInfo.feedName}`);
}

export async function following(cmdName: string) {
  const currentUser = readConfig().currentUserName;
  const user = await getUserByName(currentUser);
  const result = await getFeedFollowsForUser(user.id);
  for (const feed of result) {
    console.log(feed.feeds.name);
  }
}
