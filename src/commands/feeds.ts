import {
  createFeed,
  getFeeds,
  getFeedsWithUsers,
} from "src/lib/db/queries/feeds";
import { CommandHandler } from "./commands";
import { readConfig } from "src/config";
import { getUserByName, getUsers } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";
import { createFeedFollow } from "src/lib/db/queries/feed-follows";

export async function addfeed(cmdName: string, name: string, url: string) {
  const config = readConfig();
  const loggedUser = await getUserByName(config.currentUserName);
  if (!loggedUser) {
    throw new Error("User not found.");
  }
  const newFeed = await createFeed(name, url, loggedUser.id);
  const newFeedFollow = await createFeedFollow(loggedUser.id, newFeed.id);
  console.log(`${newFeedFollow.userName} - ${newFeedFollow.feedName}`);
}

export async function handlerListFeeds(cmdName: string) {
  const feedsWithUsers = await getFeedsWithUsers();
  const grouped = new Map<string, { feedName: string; feedUrl: string }[]>();

  for (const row of feedsWithUsers) {
    if (!grouped.has(row.userName)) {
      grouped.set(row.userName, []);
    }
    grouped
      .get(row.userName)!
      .push({ feedName: row.feedName, feedUrl: row.feedUrl });
  }
  for (const [userName, userFeeds] of grouped) {
    console.log(userName);
    for (const feed of userFeeds) {
      console.log(`  ${feed.feedName} - ${feed.feedUrl}`);
    }
  }
}
