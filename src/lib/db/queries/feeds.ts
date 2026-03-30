import { db } from "..";
import { feeds } from "../schema";

export async function createFeed(name: string, url: string, userID: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, userId: userID })
    .returning();
  return result;
}
