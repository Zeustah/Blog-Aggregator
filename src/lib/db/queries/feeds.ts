import { db } from "..";
import { feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(name: string, url: string, userID: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, userId: userID })
    .returning();
  return result;
}

export async function getFeeds() {
  const result = await db.select().from(feeds);
  return result;
}

export async function getFeedsWithUsers() {
  return await db
    .select({
      feedName: feeds.name,
      feedUrl: feeds.url,
      userName: users.name,
    })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeedByUrl(url: string) {
  return await db.select().from(feeds).where(eq(feeds.url, url));
}
