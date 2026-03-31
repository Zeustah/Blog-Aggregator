import {
  createFeed,
  getFeeds,
  getFeedsWithUsers,
} from "src/lib/db/queries/feeds";
import { CommandHandler } from "./commands";
import { readConfig } from "src/config";
import { getUserByName, getUsers } from "src/lib/db/queries/users";
import { Feed, User, users } from "src/lib/db/schema";

export async function addfeed(cmdName: string, name: string, url: string) {
  const config = readConfig();
  const loggedUser = await getUserByName(config.currentUserName);
  if (!loggedUser) {
    throw new Error("User not found.");
  }
  const newFeed = await createFeed(name, url, loggedUser.id);
  printFeed(newFeed, loggedUser);
}

export function printFeed(feed: Feed, user: User) {
  console.log("Feed Id:", feed.id);
  console.log("Feed Name:", feed.name);
  console.log("Feed Created At:", feed.createdAt);
  console.log("Feed Updated At:", feed.updatedAt);
  console.log("Feed Url:", feed.url);
  console.log("Feed User Id:", feed.userId);
  console.log("User Id:", user.id);
  console.log("User Name:", user.name);
  console.log("User Created At:", user.createdAt);
  console.log("User Updated At:", user.updatedAt);
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
