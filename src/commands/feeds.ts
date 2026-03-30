import { createFeed } from "src/lib/db/queries/feeds";
import { CommandHandler } from "./commands";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";

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
